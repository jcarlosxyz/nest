import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class SeedService {

async executeSeed(){
    // URL de la API o recurso
      const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=1&offset=0'; // Reemplaza con la URL que deseas consultar

      // Usar fetch para realizar una solicitud GE
  try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        data.results.forEach(({name,url}) =>{

              //console.log({name,url})
              const segment = url.split('/');
              console.log(segment);
              const no = +segment[segment.length - 2];
              console.log({name,no});

        })
        //console.log(data.results);

        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
}     
