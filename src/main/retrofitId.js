export default function retrofitId(azurapi, retrofit, retrofit_effect) {
    const gid = azurapi._gid;

    if ( azurapi.retrofit ) {
        let retrofit_tree = [];
        retrofit[gid].transform_list.forEach((idx) => {
            idx.forEach((kai) => retrofit_tree.push(kai[1]));
        });

        retrofit_tree.forEach((idx) => {
            if ( retrofit_effect[idx].ship_id.length !=== 0 )
        });
    };

    return 
};