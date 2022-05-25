export default function gear_extract(idx, data, ship, retrofit) {
    function replacer(type) {
        let data = [];
        type.forEach((x) => {
            if ( x === 1  ) { data.push("DD Guns") };
            if ( x === 2  ) { data.push("CL Guns") };
            if ( x === 3  ) { data.push("CA Guns") };
            if ( x === 4  ) { data.push("BB Guns") };
            if ( x === 5  ) { data.push("Torpedoes") };
            if ( x === 6  ) { data.push("AA Guns") };
            if ( x === 7  ) { data.push("Fighter") };
            if ( x === 8  ) { data.push("Torpedo Bomber") };
            if ( x === 9  ) { data.push("Dive Bomber") };
            if ( x === 10 ) { data.push("Auxiliary") };
            if ( x === 11 ) { data.push("CB Guns") };
            if ( x === 12 ) { data.push("Seaplanes") };
            if ( x === 13 ) { data.push("Submarine Torpedoes") };
            if ( x === 14 ) { data.push("Auxiliary") };
            if ( x === 15 ) { data.push("Anti-Submarine Aircraft") };
            if ( x === 17 ) { data.push("Helicopter") };
            if ( x === 18 ) { data.push("Cargo") };
        });
        return data.toString().replace(/,/g,"\/");
    };

    const coefficient = ship[idx].equipment_proficiency;
    const count       = ship[idx].base_list;

    const coef_1 = Math.round(100 * coefficient[0]) + retrofit.s1;
    const coef_2 = Math.round(100 * coefficient[1]) + retrofit.s2;
    const coef_3 = Math.round(100 * coefficient[2]) + retrofit.s3;

    const slot1 = ({ type: replacer(data[idx].equip_1,), efficiency: coef_1 + "%", count: count[0] });
    const slot2 = ({ type: replacer(data[idx].equip_2,), efficiency: coef_2 + "%", count: count[1] });
    const slot3 = ({ type: replacer(data[idx].equip_3,), efficiency: coef_3 + "%", count: count[2] });

    const gear_builder = ({ slot1: slot1, slot2: slot2, slot3: slot3 });
    return gear_builder
};