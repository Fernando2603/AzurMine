export default function stats_extract(idx, ship, enhance, data, retrofit) {
    const id_group        = idx.toString().slice(0, -1);
    const enhance_stats   = enhance[id_group].durability;

    const enhance_fp      = enhance_stats[0];
    const enhance_trp     = enhance_stats[1];
    const enhance_avi     = enhance_stats[3];
    const enhance_rld     = enhance_stats[4];

    const stats_base      = ship[idx].attrs;
    const stats_growth    = ship[idx].attrs_growth;

    function getStats(idx, enhance=0, oath_stats=1.06) {
        return Math.floor( ( stats_base[idx] + ( ( stats_growth[idx] * 124 ) / 1000 ) + enhance ) * oath_stats );
    };

    const armor = ship[idx].armor_type.toString().replace("1", "Light").replace("2", "Medium").replace("3", "Heavy");
    const hp    = retrofit.hp  + getStats(0);
    const fp    = retrofit.fp  + getStats(1, enhance_fp);
    const trp   = retrofit.trp + getStats(2, enhance_trp);
    const aa    = retrofit.aa  + getStats(3);
    const avi   = retrofit.avi + getStats(4, enhance_avi);
    const rld   = retrofit.rld + getStats(5, enhance_rld);
    const hit   = retrofit.hit + getStats(7);
    const eva   = retrofit.eva + getStats(8);
    const spd   = retrofit.spd + getStats(9, 0, 1);
    const luck  = getStats(10, 0, 1);
    const asw   = retrofit.asw + getStats(11);
    const cost  = data[idx].oil_at_end + 1 - retrofit.oil;

    const stats_builder = ({
        health: hp,
        armor: armor,
        firepower: fp,
        torpedo: trp,
        antiAir: aa,
        aviation: avi,
        reload: rld,
        hit: hit,
        evasion: eva,
        speed: spd,
        luck: luck,
        asw: asw,
        cost: cost
    });
    return stats_builder
};