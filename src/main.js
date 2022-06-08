import fs from 'node:fs';

import stats from "./main/stats.js";
import growth from "./main/growth.js";
import enhance from "./main/enhance.js";
import enhance_kai from "./main/enhance_kai.js";
import retrofit from "./main/retrofit.js";

export default function main(
    azurapi, ship, enhance_data,
    enhance_meta, meta_repair, meta_effect,
    enhance_pr, pr_effect,
    retrofit_data, retrofit_effect
) {
    let json_builder = [];
    azurapi.forEach((api) => {
        const gid     = api._gid;
        const sid     = api._sid;
        const id      = api.id;
        const name    = api.names.en;

        const stats_builder   = stats(api, ship, 4);
        const growth_builder  = growth(api, ship, 4);
        const enhance_builder = enhance(api, enhance_data, enhance_meta, meta_repair, meta_effect, enhance_pr, pr_effect);

        const retrofit_builder = retrofit(api, retrofit_data, retrofit_effect);
        const retrofit_id      = retrofit(api, retrofit_data, retrofit_effect, true);
        const retrofit_stats   = stats(api, ship, retrofit_id, true);
        const retrofit_growth  = growth(api, ship, retrofit_id, true);
        const retrofit_enhance = enhance_kai(api, enhance_data, enhance_meta, retrofit_id);
        json_builder.push({
            id: id,
            gid: gid,
            name: name,
            stats: stats_builder,
            growth: growth_builder,
            enhance: enhance_builder,
            retrofit: retrofit_builder,
            retrofit_stats: retrofit_stats,
            retrofit_growth: retrofit_growth,
            retrofit_enhance: retrofit_enhance
        });

        function statsGet(stats, growth, enhance, level=124, oath=1.06) {
            return Math.floor( ( stats + ( ( growth * level ) / 1000 ) + enhance ) * oath );
        };

        const health_125    = statsGet(stats_builder.health, growth_builder.health, enhance_builder.health);
        const firepower_125 = statsGet(stats_builder.firepower, growth_builder.firepower, enhance_builder.firepower);
        const torpedo_125   = statsGet(stats_builder.torpedo, growth_builder.torpedo, enhance_builder.torpedo);
        const antiair_125   = statsGet(stats_builder.antiair, growth_builder.antiair, enhance_builder.antiair);
        const aviation_125  = statsGet(stats_builder.aviation, growth_builder.aviation, enhance_builder.aviation);
        const reload_125    = statsGet(stats_builder.reload, growth_builder.reload, enhance_builder.reload);
        const hit_125       = statsGet(stats_builder.hit, growth_builder.hit, enhance_builder.hit);
        const evasion_125   = statsGet(stats_builder.evasion, growth_builder.evasion, enhance_builder.evasion);
        const speed_125     = statsGet(stats_builder.speed, growth_builder.speed, enhance_builder.speed, 124, 1);
        const luck_125      = statsGet(stats_builder.luck, growth_builder.luck, enhance_builder.luck, 124, 1);
        const asw_125       = statsGet(stats_builder.asw, growth_builder.asw, enhance_builder.asw);

        const stats125 = api.stats.level125;
        function consoleGet(stats_1, stats_2, type) {
            if ( stats_1.toString() !== stats_2.toString() )
            {
                console.log(name + " = " + type + " = " + stats_1 + " !== " + stats_2);
            };
        };

        consoleGet(stats125.health, health_125, "hp");
        consoleGet(stats125.firepower, firepower_125, "fp");
        consoleGet(stats125.torpedo, torpedo_125, "trp");
        consoleGet(stats125.antiair, antiair_125, "aa");
        consoleGet(stats125.aviation, aviation_125, "avi");
        consoleGet(stats125.reload, reload_125, "rld");
        consoleGet(stats125.accuracy, hit_125, "hit");
        consoleGet(stats125.evasion, evasion_125, "eva");
        consoleGet(stats125.speed, speed_125, "spd");
        consoleGet(stats125.luck, luck_125, "luck");
        consoleGet(stats125.antisubmarineWarfare, asw_125, "asw");

        const health_120    = retrofit_builder.health + statsGet(retrofit_stats.health, retrofit_growth.health, retrofit_enhance.health, 119);
        const firepower_120 = retrofit_builder.firepower + statsGet(retrofit_stats.firepower, retrofit_growth.firepower, retrofit_enhance.firepower, 119);
        const torpedo_120   = retrofit_builder.torpedo + statsGet(retrofit_stats.torpedo, retrofit_growth.torpedo, retrofit_enhance.torpedo, 119);
        const antiair_120   = retrofit_builder.antiair + statsGet(retrofit_stats.antiair, retrofit_growth.antiair, retrofit_enhance.antiair, 119);
        const aviation_120  = retrofit_builder.aviation + statsGet(retrofit_stats.aviation, retrofit_growth.aviation, retrofit_enhance.aviation, 119);
        const reload_120    = retrofit_builder.reload + statsGet(retrofit_stats.reload, retrofit_growth.reload, retrofit_enhance.reload, 119);
        const hit_120       = retrofit_builder.hit + statsGet(retrofit_stats.hit, retrofit_growth.hit, retrofit_enhance.hit, 119);
        const evasion_120   = retrofit_builder.evasion + statsGet(retrofit_stats.evasion, retrofit_growth.evasion, retrofit_enhance.evasion, 119);
        const speed_120     = retrofit_builder.speed + statsGet(retrofit_stats.speed, retrofit_growth.speed, retrofit_enhance.speed, 119, 1);
        const luck_120      = retrofit_builder.luck + statsGet(retrofit_stats.luck, retrofit_growth.luck, retrofit_enhance.luck, 119, 1);
        const asw_120       = retrofit_builder.asw + statsGet(retrofit_stats.asw, retrofit_growth.asw, retrofit_enhance.asw, 119);

        if ( api.retrofit ) {
            const stats120 = api.stats.level120Retrofit;
            function consoleKaiGet(stats_1, stats_2, type) {
                if ( stats_1.toString() !== stats_2.toString() )
                {
                    console.log(name + " = kai = " + type + " = " + stats_1 + " !== " + stats_2);
                };
            };
            consoleKaiGet(stats120.health, health_120, "hp");
            consoleKaiGet(stats120.firepower, firepower_120, "fp");
            consoleKaiGet(stats120.torpedo, torpedo_120, "trp");
            consoleKaiGet(stats120.antiair, antiair_120, "aa");
            consoleKaiGet(stats120.aviation, aviation_120, "avi");
            consoleKaiGet(stats120.reload, reload_120, "rld");
            consoleKaiGet(stats120.accuracy, hit_120, "hit");
            consoleKaiGet(stats120.evasion, evasion_120, "eva");
            consoleKaiGet(stats120.speed, speed_120, "spd");
            consoleKaiGet(stats120.luck, luck_120, "luck");
            consoleKaiGet(stats120.antisubmarineWarfare, asw_120, "asw");
        };            
    });

    fs.writeFile("./src/azurapi.json", JSON.stringify(azurapi, null, '\t'), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON to File");
            return console.log(err);
        };
        console.log("=> ./src/azurapi.json has been updated!");
    });

    fs.writeFile("./stats.json", JSON.stringify(json_builder, null, '\t'), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON to File");
            return console.log(err);
        };
        console.log("=> ./stats.json has been updated!");
    });
};