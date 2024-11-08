import { User } from '../models/User.js';  
import bcrypt from 'bcrypt';   
import { faker } from '@faker-js/faker'; 
import { sequelize } from './database.js';       

const generateRandomUser = () => ({
    fullname: faker.person.fullName(),
    // Password applied to alll seed users is 'password123' 
    password: bcrypt.hashSync('password123', 10), 
    email: faker.internet.email(),
});

const seedDatabase = async () => {
    try {
        await User.destroy({
            where: {},
        });

        // Generate 20 users with random data
        const users = Array.from({ length: 20 }, generateRandomUser);

        await User.bulkCreate(users);

        console.log('20 test users have been added to the database!');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
};

seedDatabase();
