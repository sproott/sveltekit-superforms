import { effect } from '$lib/adapters/effect.js';
import { message, superValidate } from '$lib/server/index.js';
import { CreateGalaxySchema } from './schema.js';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const form = await superValidate(effect(CreateGalaxySchema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		console.log(formData);

		const form = await superValidate(formData, effect(CreateGalaxySchema), {
			allowFiles: true
		});
		console.log(form);

		if (!form.valid) return fail(400, { form });

		return message(form, 'Posted OK!');
	}
};
