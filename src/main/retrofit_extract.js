export default function retrofit_extract(idx, group_type, retrofit, retrofitdesc) {
    let retrofit_status = false;
    let kai_container   = [];
    if ( group_type !== idx.toString().slice(0, -1) ) { retrofit_status = true };

    let stats_aa  = 0;
    let stats_avi = 0;
    let stats_asw = 0;
    let stats_fp  = 0;
    let stats_eva = 0;
    let stats_hp  = 0;
    let stats_s1  = 0;
    let stats_s2  = 0;
    let stats_s3  = 0;
    let stats_hit = 0;
    let stats_rld = 0;
    let stats_spd = 0;
    let stats_trp = 0;
    let stats_oil = 0;

    if ( retrofit_status ) {
        retrofit[group_type].transform_list.forEach((kai) => {
            kai.forEach((arr) => { kai_container.push(arr[1]) });
        });

        kai_container.forEach((kai_id) => {
            retrofitdesc[kai_id].effect.forEach((efx) => {
               if ( efx.antiaircraft )            { stats_aa  += efx.antiaircraft };
               if ( efx.air )                     { stats_avi += efx.air };
               if ( efx.antisub )                 { stats_asw += efx.antisub };
               if ( efx.cannon )                  { stats_fp  += efx.cannon };
               if ( efx.dodge )                   { stats_eva += efx.dodge };
               if ( efx.durability )              { stats_hp  += efx.durability };
               if ( efx.equipment_proficiency_1 ) { stats_s1  += efx.equipment_proficiency_1 };
               if ( efx.equipment_proficiency_2 ) { stats_s2  += efx.equipment_proficiency_2 };
               if ( efx.equipment_proficiency_3 ) { stats_s3  += efx.equipment_proficiency_3 };
               if ( efx.hit )                     { stats_hit += efx.hit };
               if ( efx.reload )                  { stats_rld += efx.reload };
               if ( efx.speed )                   { stats_spd += efx.speed };
               if ( efx.torpedo )                 { stats_trp += efx.torpedo };
            });
        });
        stats_oil += 1;
    };

    const retrofit_builder = ({
        status: retrofit_status,
        aa: stats_aa,
        avi: stats_avi,
        asw: stats_asw,
        fp: stats_fp,
        eva: stats_eva,
        hp: stats_hp,
        s1: Math.round(stats_s1 * 100),
        s2: Math.round(stats_s2 * 100),
        s3: Math.round(stats_s3 * 100),
        hit: stats_hit,
        rld: stats_rld,
        spd: stats_spd,
        trp: stats_trp,
        oil: stats_oil
    });
    return retrofit_builder
};