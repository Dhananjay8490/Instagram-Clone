
const IMAGE = [
    'https://m.media-amazon.com/images/I/71Qo0RkgtSL._AC_SY300_SX300_.jpg',
    'https://m.media-amazon.com/images/I/51A8ikbNS2L._AC_SL1000_.jpg',
    'https://m.media-amazon.com/images/I/61qoDG9cphL.__AC_SX300_SY300_QL70_ML2_.jpg',
    'https://m.media-amazon.com/images/I/91ljnflzbkL._SY342_.jpg',
    'https://e1.pxfuel.com/desktop-wallpaper/659/547/desktop-wallpaper-9-16-anime-anime-holding-hands.jpg',
    'https://m.media-amazon.com/images/I/71Qo0RkgtSL._AC_SY300_SX300_.jpg',
    'https://m.media-amazon.com/images/I/51A8ikbNS2L._AC_SL1000_.jpg',
    'https://m.media-amazon.com/images/I/61qoDG9cphL.__AC_SX300_SY300_QL70_ML2_.jpg',
    'https://m.media-amazon.com/images/I/91ljnflzbkL._SY342_.jpg',
    'https://e1.pxfuel.com/desktop-wallpaper/659/547/desktop-wallpaper-9-16-anime-anime-holding-hands.jpg',
    'https://m.media-amazon.com/images/I/71Qo0RkgtSL._AC_SY300_SX300_.jpg',
    'https://m.media-amazon.com/images/I/51A8ikbNS2L._AC_SL1000_.jpg',
    'https://m.media-amazon.com/images/I/61qoDG9cphL.__AC_SX300_SY300_QL70_ML2_.jpg',
    'https://m.media-amazon.com/images/I/91ljnflzbkL._SY342_.jpg',
    'https://e1.pxfuel.com/desktop-wallpaper/659/547/desktop-wallpaper-9-16-anime-anime-holding-hands.jpg'
]

function chunckArray(array, size){
    const chuncks = [];
    for(let i = 0; i< array.length; i += size){
        chuncks.push(array.slice(i, i + size));
    }
    return chuncks;
}



export default function ExplorePage(){
    const imageGroups = chunckArray(IMAGE, 5)
    return(
        <div className="explore-page space-y-4">
            {imageGroups.map((group, groupIndex) => (
                <div className="grid grid-cols-3 gap-2" key={groupIndex}> 
                    {groupIndex % 2 !== 0 &&
                        <>
                            {group[4] &&(
                                <img 
                                    src={group[4]}
                                    className="row-span-2 object-cover w-full h-full rounded"
                                    alt=""
                                />
                            )}
                        </>
                    }
                    <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-2">
                        {group.slice(0, 4).map((img, i) => (
                            <img alt="" key={i} src={img} className="object-cover w-full rounded h-[400px]" />
                        ))}
                    </div>

                    {groupIndex % 2 === 0 &&
                        <>
                        {group[4] &&(
                            <img
                            src={group[4]}
                            className="row-span-2 object-cover w-full h-full rounded"
                            alt=""
                            />
                        )}
                        </>
                    }
                </div>    
            ))}
           
        </div>
    )
}