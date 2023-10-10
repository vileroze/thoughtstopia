import User from "@models/user";
import { hash } from "bcrypt";
import Pokedex from "pokedex-promise-v2";

const { connectToDB } = require("@utils/database");

const getPokeId = () => {
    return Math.floor(Math.random() * 500) + 1;
}

const fetchRandomPokemon = async () => {
    const P = new Pokedex();
    const response = await P.getPokemonByName(getPokeId()); // with Promise
    return response.sprites.front_default;
};


export const POST = async (req) => {
    const { email, username, password } = await req.json();

    try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ username: username });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {

            const newUser = new User({
                email: email,
                username: username,
                password: await hash(password, 12),
                image: await fetchRandomPokemon()
            });

            await newUser.save();

            return new Response('User created', { status: 200 })
        }

        return new Response('Username already taken', { status: 409 })
    } catch (error) {
        return new Response(error, { status: 500 })
    }

}