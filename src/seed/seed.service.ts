import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-responce.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
) {}      
async executeSeed(){
    // URL de la API o recurso
      const apiURL: string = 'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0'; // Reemplaza con la URL que deseas consultar

      //borramos la base de datos 
        await this.pokemonModel.deleteMany({});

      // Usar fetch para realizar una solicitud GE
try {   
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PokeResponse = await response.json();
        //console.log(data.results[0]);
        const pokemonInser: {name:string,no:number}[] =[]
        data.results.forEach(async({name,url}) =>{
        const segment = url.split('/');
        //console.log(segment);
        const no = +segment[segment.length - 2];
        pokemonInser.push({name,no});
        //const pokemon = await this.pokemonModel.create({name,no}); 
        //console.log({name,no});
        })
        //console.log(pokemonInser);
        await  this.pokemonModel.insertMany(pokemonInser);
        return 'Base de datos cargada......';
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    }
}     
