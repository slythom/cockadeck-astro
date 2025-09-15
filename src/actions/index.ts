import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { db, Cards } from 'astro:db';
import SearchForm from '@/components/SearchForm.astro';

export const server = {
    searchCard: defineAction({
        accept: 'form',
        input: z.object({
            quantity: z.coerce.number(),
            setcode: z.string(),
            collectornumber: z.string(),
        }),
        handler: async ({ quantity, setcode, collectornumber }) => {

            const response = await fetch(`https://api.scryfall.com/cards/${setcode}/${collectornumber}`);
            // console.log("response : ", response)
            const cardfound = await response.json();
            console.log(cardfound)
            const realSetcode = cardfound.set;
            const realCollectornumber = cardfound.collector_number;
            const realName = cardfound.name;

            await db.insert(Cards).values({ quantity, setcode: realSetcode, collectornumber: realCollectornumber, name: realName });
        },
    })
}