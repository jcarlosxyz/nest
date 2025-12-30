import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { filter } from 'rxjs';



@Injectable()
export class PokemonService {
  constructor(
  
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
        const pokemon = await this.pokemonModel.create(createPokemonDto); 
        return pokemon; 
    } catch (error) {
      this.errorDevBase(error);
    }
  }

async  findAll() {

    const waterPokemons = await this.pokemonModel.find();
    //return `This action returns all pokemon`;
    // Mapea para obtener solo los campos name y no
      const filteredPokemons = waterPokemons.map(pokemon => ({
          name: pokemon.name,
          no: pokemon.no
      }));
    console.log(waterPokemons);
    return waterPokemons;
  }

  async findOne(term: string) {
    
    let pokemon: Pokemon | null = null;
  
    if ( !isNaN(+term) ) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }

    // MongoID
    if ( !pokemon && isValidObjectId( term ) ) {
      pokemon = await this.pokemonModel.findById( term );
    }

    // Name
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() })
    }


    if ( !pokemon ) 
      throw new NotFoundException(`Pokemon with id, name or no "${ term }" not found`);
    

    return pokemon;
  }


  async  update(term: string, updatePokemonDto: UpdatePokemonDto) {
      const  pokemon = await this.findOne(term);
      if(updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
      try {
        //await pokemon.updateOne(updatePokemonDto,{new: true})
          const updatedPokemon = await this.pokemonModel.findByIdAndUpdate(term,updatePokemonDto,{new: true}) ;
          return updatedPokemon;
        
      } catch (error) {
        this.errorDevBase(error);
      }    
  }

async remove(id: string) {
    const  pokemon = await this.findOne(id);
    await pokemon.deleteOne();
  }

  //desplegado de error inesperado 
  private errorDevBase(error: any){
      console.log(error);
        if (error.code === 11000 ){   
        throw new BadRequestException(`Existe un error en ${JSON.stringify(error.keyValue)} El error es ==< ${JSON.stringify(error.codeName)}`);
      }
        console.log(error);      
      throw new InternalServerErrorException(`No se pudo crear el Poquemon ---checa  los los del servidor `);
    }
}



