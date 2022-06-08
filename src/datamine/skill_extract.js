export default function skill_extract(skill_list, skill) {
    let skill_builder = [];
    skill_list.forEach((idx) => {
        const skill_name = skill[idx].name;
        const skill_type = skill[idx].type.toString().replace("1", "Red").replace("2", "Blue").replace("3", "Yellow");
        let skill_desc   = skill[idx].desc;
        const skill_buff = skill[idx].desc_get_add;
        if ( skill_buff.length !== 0 ) {
            for ( var i = 0; i < skill_buff.length; i++ ) {
                do {
                    const length = i + 1;
                    skill_desc = skill_desc.replace("$" + length, skill_buff[i][1]);
                }
                while ( skill_desc.includes("$" + (i + 1)) );
            };
        };
        skill_builder.push({name: skill_name, type: skill_type, desc: skill_desc});
    });

    return skill_builder
};