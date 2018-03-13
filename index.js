import {resolve} from 'path';
import api from './server/routes';

export default function (kibana) {
    return new kibana.Plugin({
        require: ['elasticsearch'],

        uiExports: {

            app: {
                title: 'Create Index Pattern',
                description: 'This plugin allow you to create index pattern if it does not exist',
                main: 'plugins/create_index_pattern/app',
                icon: 'plugins/create_index_pattern/icon.svg'
            }

        },

        config(Joi) {
            return Joi.object({
                enabled: Joi.boolean().default(true),
            }).default();
        },


        init(server, options) {
            api(server);
        }


    });
};
