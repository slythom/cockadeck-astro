import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

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
            const cardFound = await response.json();
            // console.log(cardFound.image_uris.large)
            return cardFound.image_uris.large
            },
    })
}