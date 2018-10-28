/* Filters to filter the houses by. Used in viewhouses.jsx */
filters = 
    {
        MinRent:{
            text:"Minimum Rent",
            submenu:[
                {text:"No Min", value:0},
                {text:"500+", value:500},
                {text:"750+", value:750},
                {text:"1000+", value:1000},
                {text:"1250+", value:1250},
                {text:"1500+", value:1500},
                {text:"1750+", value:1750},
                {text:"2000+", value:2000},
                {text:"2500+", value:2500},
                {text:"3000+", value:3000}

            ]
        },
        MaxRent:{
            text:"Maximum Rent",
            submenu:[
                {text:"No Max", value:10000000},
                {text:"1000", value:1000},
                {text:"1500", value:1500},
                {text:"2000", value:2000},
                {text:"2500", value:2500},
                {text:"3000", value:3000},
                {text:"3500", value:3500},
                {text:"4000", value:4000},
                {text:"5000", value:5000},
                {text:"6000", value:6000},
                {text:"7000", value:7000},
                {text:"8000", value:8000}
            ]
        },
        Dist:{
            text:"Distance From Campus",
            submenu:[
                {text:"Any", value:-1},
                {text:"0.1 miles", value:0.1},
                {text:"0.2 miles", value:0.2},
                {text:"0.3 miles", value:0.3},
                {text:"0.4 miles", value:0.4},
                {text:"0.5 miles", value:0.5},
                {text:"0.6 miles", value:0.6},
                {text:"0.7 miles", value:0.7},
                {text:"0.8 miles", value:0.8},
                {text:"0.9 miles", value:0.9},
                {text:"1 mile", value:1},
                {text:"1.5 miles", value:1.5},
                {text:"2 miles", value:2}
            ]
        },
        NumRooms:{
            text:"Number of Bedrooms",
            submenu:[
                {text: "Any", value:-1},
                {text:"1", value:1},
                {text:"2", value:2},
                {text:"3", value:3},
                {text:"4", value:4},
                {text:"5", value:5},
                {text:"6", value:6},
                {text:"7", value:7},
                {text:"8", value:8},
                {text:"9", value:9},
                {text:"10", value:10}
            ]
        },
        Laundry:{
            text:"Laundry",
            submenu:[
                {text:"No preference", value:-1},
                {text:"Included", value:true}
            ]
        },
        Utilities:{
            text:"Utilities",
            submenu:[
                {text:"No preference", value:-1},
                {text:"Included", value:true}
            ]
        },
        Parking:{
            text:"Parking Spots",
            submenu:[
                {text:"Any", value:-1},
                {text:"0", value:0},
                {text:"1", value:1},
                {text:"2", value:2},
                {text:"3", value:3},
                {text:"4", value:4}
            ]
        },
        Pets:{
            text:"Pets",
            submenu:[
                {text:"No preference", value:-1},
                {text:"Allowed", value:true}
            ]
        }
    };