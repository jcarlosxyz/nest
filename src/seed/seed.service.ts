import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-responce.interfaces';

@Injectable()
export class SeedService {

async executeSeed(){
    // URL de la API o recurso
      const apiURL: string = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'; // Reemplaza con la URL que deseas consultar

      // Usar fetch para realizar una solicitud GE
try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PokeResponse = await response.json();
        //console.log(data.results[0]);
        
        data.results.forEach(({name,url}) =>{
        const segment = url.split('/');
        console.log(segment);
        const no = +segment[segment.length - 2];
        console.log({name,no});
        })
        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    }
}     
