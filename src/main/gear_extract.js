export default function gear_extract(idx, data, ship) {
    
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
        return data
    };

    const coefficient = ship[idx].equipment_proficiency;
    const count       = ship[idx].base_list;

    const slot1 = ({ equipable: replacer(data[idx].equip_1,), efficiency: Math.round(100 * coefficient[0]) + "%", count: count[0] });
    const slot2 = ({ equipable: replacer(data[idx].equip_2,), efficiency: Math.round(100 * coefficient[1]) + "%", count: count[1] });
    const slot3 = ({ equipable: replacer(data[idx].equip_3,), efficiency: Math.round(100 * coefficient[2]) + "%", count: count[2] });

    const gear_builder = ({ slot1: slot1, slot2: slot2, slot3: slot3 });
    return gear_builder
};