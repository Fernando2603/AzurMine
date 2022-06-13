import fs from 'node:fs';

import retrofit from "./main/retrofit.js";
import slot from "./equippable/slot.js";

export default function equippable(azurapi, data, retrofit_data, retrofit_effect) {
    let json_builder = [];

    azurapi.forEach((api) => {
        const gid  = api._gid;
        const sid  = api._sid;
        const id   = api.id;
        const name = api.names.en;

        const retrofit_id = retrofit(api, retrofit_data, retrofit_effect, true);

        const break_1 = slot(api, data, 1);
        let break_2   = [];
        let break_3   = [];
        let break_4   = [];
        let break_5   = [];
        if ( gid === 10000 || gid === 10001 || gid === 10002 )
        {
            json_builder.push({
                id: id,
                name: name,
                break_1: break_1
            });
        } else if ( api.retrofit )
        {
            break_2 = slot(api, data, 2);
            break_3 = slot(api, data, 3);
            break_4 = slot(api, data, 4);
            break_5 = slot(api, data, retrofit_id, true);

            json_builder.push({
                id: id,
                name: name,
                break_1: break_1,
                break_2: break_2,
                break_3: break_3,
                break_4: break_4,
                retrofit: break_5
            });
        } else
        {
            break_2 = slot(api, data, 2);
            break_3 = slot(api, data, 3);
            break_4 = slot(api, data, 4);

            json_builder.push({
                id: id,
                name: name,
                break_1: break_1,
                break_2: break_2,
                break_3: break_3,
                break_4: break_4
            });
        };
    });

    fs.writeFile("./equippable.json", JSON.stringify(json_builder, null, '\t'), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON to File");
            return console.log(err);
        };
        console.log("=> ./equippable.json has been updated!");
    });
};