export default function metadata_extract(idx, ship, breakout, retrofit) {
    const id_group   = idx.toString().slice(0, -1);
    const ship_name  = ship[idx].name;
    const ship_code  = ship[idx].english_name;
    const faction_id = ship[idx].nationality;
    let  rarity_id   = ship[idx].rarity;
    const type_id    = ship[idx].type;

    if ( retrofit.status ) { rarity_id += 1 };

    const limitbreak = [breakout[id_group + 1].breakout_view, breakout[id_group + 2].breakout_view, breakout[id_group + 3].breakout_view];

    let faction      = "__Error-404__";
    let rarity       = "__Error-404__";
    let type         = "__Error-404__";

    if ( faction_id === 98 ) { faction = "Universal" };
    if ( faction_id === 1  ) { faction = "Eagle Union" };
    if ( faction_id === 2  ) { faction = "Royal Navy" };
    if ( faction_id === 3  ) { faction = "Sakura Empire" };
    if ( faction_id === 4  ) { faction = "Iron Blood" };
    if ( faction_id === 5  ) { faction = "Dragon Empery" };
    if ( faction_id === 6  ) { faction = "Sardegna Empire" };
    if ( faction_id === 7  ) { faction = "Northern Parliament" };
    if ( faction_id === 8  ) { faction = "Iris Libre" };
    if ( faction_id === 9  ) { faction = "Vichya Dominion" };
    if ( faction_id === 97 ) { faction = "META" };
    if ( faction_id > 100  ) { faction = "Collab" };

    if ( rarity_id === 2 ) { rarity = "Normal" };
    if ( rarity_id === 3 ) { rarity = "Rare" };
    if ( rarity_id === 4 ) { rarity = "Elite" };
    if ( rarity_id === 5 ) { rarity = "Super Rare" };
    if ( rarity_id === 6 ) { rarity = "Ultra Rare" };

    if ( type_id === 1  ) { type = "Destroyer" };
    if ( type_id === 2  ) { type = "Light Cruiser" };
    if ( type_id === 3  ) { type = "Heavy Cruiser" };
    if ( type_id === 4  ) { type = "Battlecruiser" };
    if ( type_id === 5  ) { type = "Battleship" };
    if ( type_id === 6  ) { type = "Light Carrier" };
    if ( type_id === 7  ) { type = "Aircraft Carrier" };
    if ( type_id === 8  ) { type = "Submarine" };
    if ( type_id === 10 ) { type = "Aviation Battleship" };
    if ( type_id === 12 ) { type = "Repair Ship" };
    if ( type_id === 13 ) { type = "Monitor" };
    if ( type_id === 17 ) { type = "Submarine Carrier" };
    if ( type_id === 18 ) { type = "Large Cruiser" };
    if ( type_id === 19 ) { type = "Munition Ship" };
    if ( type_id === 20 || type_id === 21 ) { type = "Guided-missle Destroyer" };

    const metadata_builder = ({ id: idx, code: ship_code, name: ship_name, hullType: type, faction: faction, rarity: rarity, limitbreak: limitbreak });
    return metadata_builder
};