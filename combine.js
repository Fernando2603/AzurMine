import fs from 'node:fs';

const data_file = fs.readFileSync('./src/data.json');
const database  = JSON.parse(data_file);

const comb_file = fs.readFileSync('./src/translate.json');
const translate = JSON.parse(comb_file);

let main = [];
database.forEach((ship) => {
    const ship_id = ship.id;
    let translate_data;

    translate.forEach((idx) => {
        if ( ship_id === idx.id ) { translate_data = idx };
    });

    let skill_builder = [];
    for ( var i = 0; i < ship.skill.length; i++ ) {
        const skill   = ship.skill[i];
        const skill_t = translate_data.skill[i];


        const skill_name   = skill.name;
        const skill_name_t = skill_t.name;
        const skill_type   = skill.type;
        const skill_desc   = skill.desc;
        const skill_desc_t = skill_t.desc;

        skill_builder.push({
            name: skill_name,
            name_en: skill_name_t,
            type: skill_type,
            desc: skill_desc,
            desc_en: skill_desc_t
        });
    };

    const builder = ({
        id: ship.id,
        code: ship.code,
        name: ship.name,
        name_en: translate_data.name,
        hullType: ship.hullType,
        faction: ship.faction,
        rarity: ship.rarity,
        limitbreak: ship.limitbreak,
        limitbreak_en: translate_data.limitbreak,
        equip: {
            slot1: {
                type: ship.equip.slot1.type,
                efficiency: ship.equip.slot1.efficiency,
                count: ship.equip.slot1.count,
            },
            slot2: {
                type: ship.equip.slot2.type,
                efficiency: ship.equip.slot2.efficiency,
                count: ship.equip.slot2.count,
            },
            slot3: {
                type: ship.equip.slot3.type,
                efficiency: ship.equip.slot3.efficiency,
                count: ship.equip.slot3.count,
            }
        },
        stats: {
            health: ship.stats.health,
            armor: ship.stats.armor,
            firepower: ship.stats.firepower,
            torpedo: ship.stats.torpedo,
            antiAir: ship.stats.antiAir,
            aviation: ship.stats.aviation,
            reload: ship.stats.reload,
            hit: ship.stats.hit,
            evasion: ship.stats.evasion,
            speed: ship.stats.speed,
            luck: ship.stats.luck,
            asw: ship.stats.asw,
            cost: ship.stats.cost,
        },
        skill: skill_builder
    });

    main.push(builder);
});

fs.writeFile("./datamine.json", JSON.stringify(main, null, '\t'), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON to File");
        return console.log(err);
    };
    console.log("=> ./datamine.json has been updated!");
});