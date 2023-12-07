import {v4 as uuid} from 'uuid';
import { categories } from '../../constants';

const companies = ['Google', 'Meta', 'Uber', 'Amazon', 'Nvidia', 'Netflix']
const positions = ['Software Developer', 'Fullstack Developer', 'Software Engineer', 'Frontend Engineer', 'Backend Engineer']

export const getJobData = (num_data) =>{
    let data = []

    if(num_data <= 0) throw "ERROR: number of data samples must be greater than zero"

    for(let i = 0; i < num_data; i++){
        data.push({
            id: uuid(),
            company: companies[Math.floor(Math.random()*companies.length)],
            position: positions[Math.floor(Math.random()*positions.length)],
            category: categories[Math.floor(Math.random()*categories.length)]
        })
    }

    return data
}
