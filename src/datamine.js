import fs from 'node:fs';

import retrofit_extract from "./datamine/retrofit_extract.js";
import metadata_extract from "./datamine/metadata_extract.js";
import gear_extract from "./datamine/gear_extract.js";
import skill_extract from "./datamine/skill_extract.js";
import stats_extract from "./datamine/stats_extract.js";

export default function datamine(ship_id, ship, skill, data, enhance, breakout, retrofit, retrofitdesc) {
    let json_builder = [];
    ship_id.forEach((cs) => {
        const idx           = cs.id;
        const group_type    = data[idx].group_type.toString();
        const skill_list    = data[idx].buff_list_display;

        const retrofit_builder = retrofit_extract(idx, group_type, retrofit, retrofitdesc);
        const metadata_builder = metadata_extract(idx, ship, breakout, retrofit_builder);
        const gear_builder     = gear_extract(idx, data, ship, retrofit_builder);
        const skill_builder    = skill_extract(skill_list, skill);
        const stats_builder    = stats_extract(idx, ship, enhance, data, retrofit_builder);

        json_builder.push({...metadata_builder, equip: gear_builder, stats: stats_builder, skill: skill_builder});
    });

    let translate_data = [];
    json_builder.forEach((idx) => {
        const ship_id    = idx.id;
        const ship_name  = idx.name;
        const limitbreak = idx.limitbreak;
        let ship_skill   = [];

        idx.skill.forEach((skl) => {
            ship_skill.push({ name: skl.name, desc: skl.desc })
        })

        translate_data.push({ id: ship_id, name: ship_name, limitbreak: limitbreak, skill: ship_skill });
    });

    const json_content    = JSON.stringify(json_builder, null , "\t");

    fs.writeFile("./src/data.json", json_content, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON to File");
            return console.log(err);
        };
        console.log("=> ./src/data.json has been updated!");
    });

    fs.writeFile("./src/translate.json", JSON.stringify(translate_data, null, '\t'), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON to File");
            return console.log(err);
        };
        console.log("=> ./src/translate.json has been updated!");
    });
};