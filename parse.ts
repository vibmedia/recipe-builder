import fs from 'fs';

const csv = `1302334492,"Starter [O]","Spring Roll Veg [o]",,"Veg Spring Roll",item,0,"Crispy veg roll with a deliciously spiced vegetable filling.",veg,1[O],,,,,1,0,No,services,,Yes,,,Yes
1302334557,"Starter [O]","Spring Roll Veg [o] (Half)",Half,"Veg Spring Roll",variation,179.00,"Crispy veg roll with a deliciously spiced vegetable filling.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334558,"Starter [O]","Spring Roll Veg [o] (Full)",Full,"Veg Spring Roll",variation,289.00,"Crispy veg roll with a deliciously spiced vegetable filling.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334493,"Starter [O]","Kurkure Spring Roll Veg [o]",,"Veg Kurkure Spring Roll",item,0,"Delightfully crispy roll loaded with seasoned veggies and served with chilli dip.",veg,4[O],,,,,1,0,No,services,,Yes,,,Yes
1302334559,"Starter [O]","Kurkure Spring Roll Veg [o] (Half)",Half,"Veg Kurkure Spring Roll",variation,219.00,"Delightfully crispy roll loaded with seasoned veggies and served with chilli dip.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334560,"Starter [O]","Kurkure Spring Roll Veg [o] (Full)",Full,"Veg Kurkure Spring Roll",variation,329.00,"Delightfully crispy roll loaded with seasoned veggies and served with chilli dip.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334494,"Starter [O]","Chilly Paneer [o]",,"Chilli Paneer",item,0,,veg,7[O],,"	",,,1,0,No,services,,Yes,,,Yes
1302334561,"Starter [O]","Chilly Paneer [o] (Half)",Half,"Chilli Paneer",variation,199.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334562,"Starter [O]","Chilly Paneer [o] (Full)",Full,"Chilli Paneer",variation,299.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334495,"Starter [O]","Chilly Chicken [o]",,"Chilli Chicken",item,0,"Classic Indo Chinese chicken dish tossed with onion, capsicum and spicy sauce.",non-veg,10[O],,"	",,,1,0,No,services,,Yes,,,Yes
1302334563,"Starter [O]","Chilly Chicken [o] (Half)",Half,"Chilli Chicken",variation,219.00,"Classic Indo Chinese chicken dish tossed with onion, capsicum and spicy sauce.",non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334564,"Starter [O]","Chilly Chicken [o] (Full)",Full,"Chilli Chicken",variation,319.00,"Classic Indo Chinese chicken dish tossed with onion, capsicum and spicy sauce.",non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334496,"Starter [O]","Chilly Mushroom [o]",,"Chilli Mushroom",item,0,"Mushroom pieces tossed in tangy and spicy sauce with vegetables.",veg,13[O],,"	",,,1,0,No,services,,Yes,,,Yes
1302334565,"Starter [O]","Chilly Mushroom [o] (Half)",Half,"Chilli Mushroom",variation,199.00,"Mushroom pieces tossed in tangy and spicy sauce with vegetables.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334566,"Starter [O]","Chilly Mushroom [o] (Full)",Full,"Chilli Mushroom",variation,299.00,"Mushroom pieces tossed in tangy and spicy sauce with vegetables.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334497,"Starter [O]","Manchurian Veg [o]",,"Veg Manchurian",item,0,"Deep fried vegetable balls cooked in rich manchurian sauce.",veg,16[O],,"	",,,1,0,No,services,,Yes,,,Yes
1302334567,"Starter [O]","Manchurian Veg [o] (Half)",Half,"Veg Manchurian",variation,189.00,"Deep fried vegetable balls cooked in rich manchurian sauce.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334568,"Starter [O]","Manchurian Veg [o] (Full)",Full,"Veg Manchurian",variation,259.00,"Deep fried vegetable balls cooked in rich manchurian sauce.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334498,"Starter [O]","Honey Chilly Patoto [o]",,"Honey Chilli Potato",item,0,"Crispy potato fingers coated with honey and chilli glaze.",veg,19[O],,,,,1,0,No,services,,Yes,,,Yes
1302334569,"Starter [O]","Honey Chilly Patoto [o] (Half)",Half,"Honey Chilli Potato",variation,179.00,"Crispy potato fingers coated with honey and chilli glaze.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334570,"Starter [O]","Honey Chilly Patoto [o] (Full)",Full,"Honey Chilli Potato",variation,259.00,"Crispy potato fingers coated with honey and chilli glaze.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334499,"Starter [O]","Crispy Chilly Patoto [o]",,"Crispy Chilli Potato",item,0,"Deep fried potato tossed in spicy chilli sauce.",veg,22[O],,"	",,,1,0,No,services,,Yes,,,Yes
1302334571,"Starter [O]","Crispy Chilly Patoto [o] (Half)",Half,"Crispy Chilli Potato",variation,179.00,"Deep fried potato tossed in spicy chilli sauce.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334572,"Starter [O]","Crispy Chilly Patoto [o] (Full)",Full,"Crispy Chilli Potato",variation,259.00,"Deep fried potato tossed in spicy chilli sauce.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334500,"Starter [O]","Peri Peri Fries [o]",,"Peri Peri French Fries",item,0,"Crispy fries dusted with tangy and spicy peri peri masala.",veg,25[O],,"	",,,1,0,No,services,,Yes,,,Yes
1302334573,"Starter [O]","Peri Peri Fries [o] (Half)",Half,"Peri Peri French Fries",variation,159.00,"Crispy fries dusted with tangy and spicy peri peri masala.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334574,"Starter [O]","Peri Peri Fries [o] (Full)",Full,"Peri Peri French Fries",variation,239.00,"Crispy fries dusted with tangy and spicy peri peri masala.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334501,"Starter [O]","Crispy Peper Corn [o]",,"Crispy Peper Corn",item,0,,veg,28[O],,"	",,,1,0,No,services,,Yes,,,Yes
1302334575,"Starter [O]","Crispy Peper Corn [o] (Half)",Half,"Crispy Peper Corn",variation,199.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334576,"Starter [O]","Crispy Peper Corn [o] (Full)",Full,"Crispy Peper Corn",variation,299.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334502,"Starter [O]","Drums Of Heaven [o]",,"Drums of Heaven",item,0,,non-veg,31[O],,,,,1,0,No,services,,Yes,,,Yes
1302334577,"Starter [O]","Drums Of Heaven [o] (Half)",Half,"Drums of Heaven",variation,249.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334578,"Starter [O]","Drums Of Heaven [o] (Full)",Full,"Drums of Heaven",variation,359.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334503,"Momo [O]","Veg Momo Steam [o]",,"Veg Momos",item,0,"Soft, flavorful momos packed with fresh mixed vegetables and authentic Himalayan spices.",veg,34[O],,,,,1,0,No,services,,Yes,,,Yes
1302334580,"Momo [O]","Veg Momo Steam [o] (Half)",Half,"Veg Momos",variation,149.00,"Soft, flavorful momos packed with fresh mixed vegetables and authentic Himalayan spices.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334581,"Momo [O]","Veg Momo Steam [o] (Full)",Full,"Veg Momos",variation,249.00,"Soft, flavorful momos packed with fresh mixed vegetables and authentic Himalayan spices.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334504,"Momo [O]","Paneer Momo Steam [O]",,"Paneer Momo Steam",item,0,,veg,37[O],,,,,1,0,No,services,,Yes,,,Yes
1302334582,"Momo [O]","Paneer Momo Steam [O] (Half)",Half,"Paneer Momo Steam",variation,179.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334583,"Momo [O]","Paneer Momo Steam [O] (Full)",Full,"Paneer Momo Steam",variation,279.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334505,"Momo [O]","Veg Fried Momo [o]",,"Veg Fried Momos",item,0,"Classic vegetable momos fried to golden perfection and served with tangy dip.",veg,40[O],,,,,1,0,No,services,,Yes,,,Yes
1302334584,"Momo [O]","Veg Fried Momo [o] (Half)",Half,"Veg Fried Momos",variation,199.00,"Classic vegetable momos fried to golden perfection and served with tangy dip.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334585,"Momo [O]","Veg Fried Momo [o] (Full)",Full,"Veg Fried Momos",variation,299.00,"Classic vegetable momos fried to golden perfection and served with tangy dip.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334506,"Momo [O]","Chilli Momo Veg [o]",,"Veg Chilli Momos",item,0,"[Veg preparation] Spicy momos tossed with onion, capsicum and schezwan sauce.",veg,43[O],,,,,1,0,No,services,,Yes,,,Yes
1302334586,"Momo [O]","Chilli Momo Veg [o] (Half)",Half,"Veg Chilli Momos",variation,219.00,"[Veg preparation] Spicy momos tossed with onion, capsicum and schezwan sauce.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334587,"Momo [O]","Chilli Momo Veg [o] (Full)",Full,"Veg Chilli Momos",variation,299.00,"[Veg preparation] Spicy momos tossed with onion, capsicum and schezwan sauce.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334507,"Momo [O]","Chilli Momo Paneer [O]",,"Chilli Momo Paneer",item,0,,veg,46[O],,,,,1,0,No,services,,Yes,,,Yes
1302334588,"Momo [O]","Chilli Momo Paneer [O] (Half)",Half,"Chilli Momo Paneer",variation,199.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334589,"Momo [O]","Chilli Momo Paneer [O] (Full)",Full,"Chilli Momo Paneer",variation,299.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334508,"Momo [O]","Chilly Momo Chicken [o]",,"Chicken Chilli Momos",item,0,,non-veg,49[O],,,,,1,0,No,services,,Yes,,,Yes
1302334590,"Momo [O]","Chilly Momo Chicken [o] (Half)",Half,"Chicken Chilli Momos",variation,249.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334591,"Momo [O]","Chilly Momo Chicken [o] (Full)",Full,"Chicken Chilli Momos",variation,339.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334509,"Momo [O]","Chicken Momo Steam [O]",,"Chicken Momo Steam",item,0,,non-veg,52[O],,,,,1,0,No,services,,Yes,,,Yes
1302334592,"Momo [O]","Chicken Momo Steam [O] (Half)",Half,"Chicken Momo Steam",variation,199.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334593,"Momo [O]","Chicken Momo Steam [O] (Full)",Full,"Chicken Momo Steam",variation,299.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334510,"Momo [O]","Fried Chicken Momo [o]",,"Chicken Fried Momos",item,0,,non-veg,55[O],,,,,1,0,No,services,,Yes,,,Yes
1302334594,"Momo [O]","Fried Chicken Momo [o] (Half)",Half,"Chicken Fried Momos",variation,219.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334595,"Momo [O]","Fried Chicken Momo [o] (Full)",Full,"Chicken Fried Momos",variation,299.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334511,"Momo [O]","Paneer Fried Momo [O]",,"Paneer Fried Momo",item,0,,veg,58[O],,,,,1,0,No,services,,Yes,,,Yes
1302334596,"Momo [O]","Paneer Fried Momo [O] (Half)",Half,"Paneer Fried Momo",variation,199.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334597,"Momo [O]","Paneer Fried Momo [O] (Full)",Full,"Paneer Fried Momo",variation,299.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334512,"Momo [O]","Chicken Afghani Momo [o]",,"Chicken Afghani Momo",item,0,,non-veg,61[O],,"	",,,1,0,No,services,,Yes,,,Yes
1302334598,"Momo [O]","Chicken Afghani Momo [o] (Half)",Half,"Chicken Afghani Momo",variation,239.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334599,"Momo [O]","Chicken Afghani Momo [o] (Full)",Full,"Chicken Afghani Momo",variation,349.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334513,"Momo [O]","Paneer Afghani Momo [O]",,"Paneer Afghani Momo",item,0,,veg,64[O],,,,,1,0,No,services,,Yes,,,Yes
1302334600,"Momo [O]","Paneer Afghani Momo [O] (Half)",Half,"Paneer Afghani Momo",variation,239.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334601,"Momo [O]","Paneer Afghani Momo [O] (Full)",Full,"Paneer Afghani Momo",variation,349.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334514,"Momo [O]","Veg Kurkure Momo [O]",,"Veg Kurkure Momo",item,0,,veg,67[O],,,,,1,0,No,services,,Yes,,,Yes
1302334602,"Momo [O]","Veg Kurkure Momo [O] (Half)",Half,"Veg Kurkure Momo",variation,199.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334603,"Momo [O]","Veg Kurkure Momo [O] (Full)",Full,"Veg Kurkure Momo",variation,299.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334515,"Momo [O]","Chicken Kurkure Momo [o]",,"Chicken Kurkure Momos",item,0,"Crunchy, fried chicken momos with a crispy coating and juicy filling inside.",non-veg,70[O],,,,,1,0,No,services,,Yes,,,Yes
1302334604,"Momo [O]","Chicken Kurkure Momo [o] (Half)",Half,"Chicken Kurkure Momos",variation,229.00,"Crunchy, fried chicken momos with a crispy coating and juicy filling inside.",non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334605,"Momo [O]","Chicken Kurkure Momo [o] (Full)",Full,"Chicken Kurkure Momos",variation,329.00,"Crunchy, fried chicken momos with a crispy coating and juicy filling inside.",non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334516,"Momo [O]","Paneer Kurkure Momo [O]",,"Paneer Kurkure Momo",item,0,,veg,73[O],,,,,1,0,No,services,,Yes,,,Yes
1302334606,"Momo [O]","Paneer Kurkure Momo [O] (Half)",Half,"Paneer Kurkure Momo",variation,229.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334607,"Momo [O]","Paneer Kurkure Momo [O] (Full)",Full,"Paneer Kurkure Momo",variation,329.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334517,"Momo [O]","Veg Tandoori Momo [O]",,"Veg Tandoori Momo",item,0,,veg,76[O],,,,,1,0,No,services,,Yes,,,Yes
1302334608,"Momo [O]","Veg Tandoori Momo [O] (Half)",Half,"Veg Tandoori Momo",variation,199.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334609,"Momo [O]","Veg Tandoori Momo [O] (Full)",Full,"Veg Tandoori Momo",variation,299.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334518,"Momo [O]","Chicken Tandoori Momo [O]",,"Chicken Tandoori Momo",item,0,,non-veg,79[O],,,,,1,0,No,services,,Yes,,,Yes
1302334610,"Momo [O]","Chicken Tandoori Momo [O] (Half)",Half,"Chicken Tandoori Momo",variation,239.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334611,"Momo [O]","Chicken Tandoori Momo [O] (Full)",Full,"Chicken Tandoori Momo",variation,349.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334519,"Momo [O]","Paneer Tandoori Momo [O]",,"Paneer Tandoori Momo",item,0,,veg,82[O],,,,,1,0,No,services,,Yes,,,Yes
1302334612,"Momo [O]","Paneer Tandoori Momo [O] (Half)",Half,"Paneer Tandoori Momo",variation,239.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334613,"Momo [O]","Paneer Tandoori Momo [O] (Full)",Full,"Paneer Tandoori Momo",variation,349.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334520,"Noodles [O]","Veg Hakka Noodle [o]",,"Veg Hakka Noodles",item,0,,veg,85[O],,,,,1,0,No,services,,Yes,,,Yes
1302334614,"Noodles [O]","Veg Hakka Noodle [o] (Half)",Half,"Veg Hakka Noodles",variation,219.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334615,"Noodles [O]","Veg Hakka Noodle [o] (Full)",Full,"Veg Hakka Noodles",variation,299.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334521,"Noodles [O]","Chilly Garlic Noodle [o]",,"Chilli Garlic Noodles",item,0,"Zesty noodles tossed in chilli garlic sauce with crunchy veggies.",veg,88[O],,,,,1,0,No,services,,Yes,,,Yes
1302334616,"Noodles [O]","Chilly Garlic Noodle [o] (Half)",Half,"Chilli Garlic Noodles",variation,219.00,"Zesty noodles tossed in chilli garlic sauce with crunchy veggies.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334617,"Noodles [O]","Chilly Garlic Noodle [o] (Full)",Full,"Chilli Garlic Noodles",variation,299.00,"Zesty noodles tossed in chilli garlic sauce with crunchy veggies.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334522,"Noodles [O]","Singapore Noodle Veg [o]",,"Veg Singapore Noodles",item,0,"[Veg preparation] Thin noodles stir fried with curry flavor and mixed vegetables.",veg,91[O],,,,,1,0,No,services,,Yes,,,Yes
1302334618,"Noodles [O]","Singapore Noodle Veg [o] (Half)",Half,"Veg Singapore Noodles",variation,219.00,"[Veg preparation] Thin noodles stir fried with curry flavor and mixed vegetables.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334619,"Noodles [O]","Singapore Noodle Veg [o] (Full)",Full,"Veg Singapore Noodles",variation,299.00,"[Veg preparation] Thin noodles stir fried with curry flavor and mixed vegetables.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334523,"Noodles [O]","Singapore Noodle Chicken [o]",,"Chicken Singapore Noodles",item,0,"Spicy, aromatic noodles cooked with chicken and Asian spices.",non-veg,94[O],,,,,1,0,No,services,,Yes,,,Yes
1302334620,"Noodles [O]","Singapore Noodle Chicken [o] (Half)",Half,"Chicken Singapore Noodles",variation,249.00,"Spicy, aromatic noodles cooked with chicken and Asian spices.",non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334621,"Noodles [O]","Singapore Noodle Chicken [o] (Full)",Full,"Chicken Singapore Noodles",variation,319.00,"Spicy, aromatic noodles cooked with chicken and Asian spices.",non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334524,"Noodles [O]","Paneer Noodle [o]",,"Paneer Noodles",item,0,"Noodles tossed with soft paneer cubes and flavorful sauce.",veg,97[O],,,,,1,0,No,services,,Yes,,,Yes
1302334622,"Noodles [O]","Paneer Noodle [o] (Half)",Half,"Paneer Noodles",variation,239.00,"Noodles tossed with soft paneer cubes and flavorful sauce.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334623,"Noodles [O]","Paneer Noodle [o] (Full)",Full,"Paneer Noodles",variation,319.00,"Noodles tossed with soft paneer cubes and flavorful sauce.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334525,"Noodles [O]","Egg Noodle [o]",,"Egg Noodles",item,0,,egg,100[O],,,,,1,0,No,services,,Yes,,,Yes
1302334624,"Noodles [O]","Egg Noodle [o] (Half)",Half,"Egg Noodles",variation,219.00,,egg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334625,"Noodles [O]","Egg Noodle [o] (Full)",Full,"Egg Noodles",variation,319.00,,egg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334526,"Noodles [O]","Chicken Noodle [O]",,"Chicken Noodle",item,0,,non-veg,103[O],,,,,1,0,No,services,,Yes,,,Yes
1302334626,"Noodles [O]","Chicken Noodle [O] (Half)",Half,"Chicken Noodle",variation,249.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334627,"Noodles [O]","Chicken Noodle [O] (Full)",Full,"Chicken Noodle",variation,329.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334527,"Noodles [O]","Chicken Egg Noodle [O]",,"Chicken Egg Noodle",item,0,,non-veg,106[O],,,,,1,0,No,services,,Yes,,,Yes
1302334628,"Noodles [O]","Chicken Egg Noodle [O] (Half)",Half,"Chicken Egg Noodle",variation,259.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334629,"Noodles [O]","Chicken Egg Noodle [O] (Full)",Full,"Chicken Egg Noodle",variation,349.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334528,"Rice [O]","Veg Fried Rice [o]",,"Veg Fried Rice",item,0,"Classic fried rice with a mix of fresh veggies and soy seasoning.",veg,109[O],,,,,1,0,No,services,,Yes,,,Yes
1302334630,"Rice [O]","Veg Fried Rice [o] (Half)",Half,"Veg Fried Rice",variation,249.00,"Classic fried rice with a mix of fresh veggies and soy seasoning.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334631,"Rice [O]","Veg Fried Rice [o] (Full)",Full,"Veg Fried Rice",variation,349.00,"Classic fried rice with a mix of fresh veggies and soy seasoning.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334529,"Rice [O]","Schezwann Rice- Veg [o]",,"Schezwan Fried Rice",item,0,"[Veg preparation] Fiery schezwan style rice bursting with bold flavor.",veg,112[O],,,,,1,0,No,services,,Yes,,,Yes
1302334632,"Rice [O]","Schezwann Rice- Veg [o] (Half)",Half,"Schezwan Fried Rice",variation,249.00,"[Veg preparation] Fiery schezwan style rice bursting with bold flavor.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334633,"Rice [O]","Schezwann Rice- Veg [o] (Full)",Full,"Schezwan Fried Rice",variation,349.00,"[Veg preparation] Fiery schezwan style rice bursting with bold flavor.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334530,"Rice [O]","Schezwann Rice - Chicken [o]",,"4 Chicken Schezwan Fried Rice",item,0,"Spicy schezwan rice loaded with chicken and veggies.",non-veg,115[O],,,,,1,0,No,services,,Yes,,,Yes
1302334634,"Rice [O]","Schezwann Rice - Chicken [o] (Half)",Half,"4 Chicken Schezwan Fried Rice",variation,269.00,"Spicy schezwan rice loaded with chicken and veggies.",non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334635,"Rice [O]","Schezwann Rice - Chicken [o] (Full)",Full,"4 Chicken Schezwan Fried Rice",variation,369.00,"Spicy schezwan rice loaded with chicken and veggies.",non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334531,"Rice [O]","Paneer Fried Rice [o]",,"Paneer Fried Rice",item,0,"Fragrant rice stir fried with paneer cubes and oriental spices.",veg,118[O],,,,,1,0,No,services,,Yes,,,Yes
1302334636,"Rice [O]","Paneer Fried Rice [o] (Half)",Half,"Paneer Fried Rice",variation,259.00,"Fragrant rice stir fried with paneer cubes and oriental spices.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334637,"Rice [O]","Paneer Fried Rice [o] (Full)",Full,"Paneer Fried Rice",variation,369.00,"Fragrant rice stir fried with paneer cubes and oriental spices.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334532,"Rice [O]","Egg Fried Rice [o]",,"Egg Fried Rice",item,0,,egg,121[O],,,,,1,0,No,services,,Yes,,,Yes
1302334638,"Rice [O]","Egg Fried Rice [o] (Half)",Half,"Egg Fried Rice",variation,259.00,,egg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334639,"Rice [O]","Egg Fried Rice [o] (Full)",Full,"Egg Fried Rice",variation,359.00,,egg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334533,"Rice [O]","Chicken Fired Rice [O]",,"Chicken Fired Rice",item,0,,non-veg,124[O],,,,,1,0,No,services,,Yes,,,Yes
1302334640,"Rice [O]","Chicken Fired Rice [O] (Half)",Half,"Chicken Fired Rice",variation,279.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334641,"Rice [O]","Chicken Fired Rice [O] (Full)",Full,"Chicken Fired Rice",variation,379.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334534,"Rice [O]","Chicken Egg Rice [O]",,"Chicken Egg Rice",item,0,,non-veg,127[O],,,,,1,0,No,services,,Yes,,,Yes
1302334642,"Rice [O]","Chicken Egg Rice [O] (Half)",Half,"Chicken Egg Rice",variation,289.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334643,"Rice [O]","Chicken Egg Rice [O] (Full)",Full,"Chicken Egg Rice",variation,389.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334535,"Chaap [O]","Masala Chaap [O]",,"Masala Chaap",item,0,,veg,130[O],,,,,1,0,No,services,,Yes,,,Yes
1302334644,"Chaap [O]","Masala Chaap [O] (Half)",Half,"Masala Chaap",variation,179.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334645,"Chaap [O]","Masala Chaap [O] (Full)",Full,"Masala Chaap",variation,279.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334536,"Chaap [O]","Malai Chaap [O]",,"Malai Chaap",item,0,,veg,133[O],,,,,1,0,No,services,,Yes,,,Yes
1302334646,"Chaap [O]","Malai Chaap [O] (Half)",Half,"Malai Chaap",variation,199.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334647,"Chaap [O]","Malai Chaap [O] (Full)",Full,"Malai Chaap",variation,299.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334537,"Chaap [O]","Tandoori Chaap [O]",,"Tandoori Chaap",item,0,,veg,136[O],,,,,1,0,No,services,,Yes,,,Yes
1302334648,"Chaap [O]","Tandoori Chaap [O] (Half)",Half,"Tandoori Chaap",variation,179.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334649,"Chaap [O]","Tandoori Chaap [O] (Full)",Full,"Tandoori Chaap",variation,279.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334538,"Chaap [O]","Afghani Chaap [O]",,"Afghani Chaap",item,0,,veg,139[O],,,,,1,0,No,services,,Yes,,,Yes
1302334650,"Chaap [O]","Afghani Chaap [O] (Half)",Half,"Afghani Chaap",variation,199.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334651,"Chaap [O]","Afghani Chaap [O] (Full)",Full,"Afghani Chaap",variation,299.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334539,"Chaap [O]","Kurkure Chaap [O]",,"Kurkure Chaap",item,0,,veg,142[O],,,,,1,0,No,services,,Yes,,,Yes
1302334652,"Chaap [O]","Kurkure Chaap [O] (Half)",Half,"Kurkure Chaap",variation,179.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334653,"Chaap [O]","Kurkure Chaap [O] (Full)",Full,"Kurkure Chaap",variation,279.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334540,"Soup [O]","Veg Sweetcorn Soup [O]",,"Veg Sweetcorn Soup",item,0,,veg,145[O],,,,,1,0,No,services,,Yes,,,Yes
1302334654,"Soup [O]","Veg Sweetcorn Soup [O] (Half)",Half,"Veg Sweetcorn Soup",variation,219.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334655,"Soup [O]","Veg Sweetcorn Soup [O] (Full)",Full,"Veg Sweetcorn Soup",variation,219.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334541,"Soup [O]","Hot & Sour Soup [o]",,"Hot and Sour Soup",item,0,"A perfect balance of tangy, spicy flavor with vegetables and soy.",veg,148[O],,,,,1,0,No,services,,Yes,,,Yes
1302334656,"Soup [O]","Hot & Sour Soup [o] (Half)",Half,"Hot and Sour Soup",variation,219.00,"A perfect balance of tangy, spicy flavor with vegetables and soy.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334657,"Soup [O]","Hot & Sour Soup [o] (Full)",Full,"Hot and Sour Soup",variation,219.00,"A perfect balance of tangy, spicy flavor with vegetables and soy.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334542,"Soup [O]","Manchow Soup [o]",,"Veg Manchow Soup",item,0,"Thick, spicy soup with minced vegetables and served with crunchy noodles.",veg,151[O],,,,,1,0,No,services,,Yes,,,Yes
1302334658,"Soup [O]","Manchow Soup [o] (Half)",Half,"Veg Manchow Soup",variation,219.00,"Thick, spicy soup with minced vegetables and served with crunchy noodles.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334659,"Soup [O]","Manchow Soup [o] (Full)",Full,"Veg Manchow Soup",variation,219.00,"Thick, spicy soup with minced vegetables and served with crunchy noodles.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334543,"Soup [O]","Noodle Soup [o]",,"Veg Noodles Soup",item,0,"A hearty noodles based soup loaded with vegetables and Asian spices.",veg,154[O],,,,,1,0,No,services,,Yes,,,Yes
1302334660,"Soup [O]","Noodle Soup [o] (Half)",Half,"Veg Noodles Soup",variation,219.00,"A hearty noodles based soup loaded with vegetables and Asian spices.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334661,"Soup [O]","Noodle Soup [o] (Full)",Full,"Veg Noodles Soup",variation,219.00,"A hearty noodles based soup loaded with vegetables and Asian spices.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334544,"Continental [O]","Veg White Sauce Pasta [o]",,"Veg White Sauce Pasta",item,0,,veg,157[O],,,,,1,0,No,services,,Yes,,,Yes
1302334662,"Continental [O]","Veg White Sauce Pasta [o] (Half)",Half,"Veg White Sauce Pasta",variation,249.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334663,"Continental [O]","Veg White Sauce Pasta [o] (Full)",Full,"Veg White Sauce Pasta",variation,369.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334545,"Continental [O]","Chicken White Sauce Pasta [O]",,"Chicken White Sauce Pasta",item,0,,non-veg,160[O],,,,,1,0,No,services,,Yes,,,Yes
1302334664,"Continental [O]","Chicken White Sauce Pasta [O] (Half)",Half,"Chicken White Sauce Pasta",variation,289.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334665,"Continental [O]","Chicken White Sauce Pasta [O] (Full)",Full,"Chicken White Sauce Pasta",variation,389.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334546,"Continental [O]","Veg Red Sause Pasta [o]",,"Veg Red Sauce Pasta",item,0,"Tangy tomato based pasta tossed with herbs and vegetables.",veg,163[O],,,,,1,0,No,services,,Yes,,,Yes
1302334666,"Continental [O]","Veg Red Sause Pasta [o] (Half)",Half,"Veg Red Sauce Pasta",variation,249.00,"Tangy tomato based pasta tossed with herbs and vegetables.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334667,"Continental [O]","Veg Red Sause Pasta [o] (Full)",Full,"Veg Red Sauce Pasta",variation,369.00,"Tangy tomato based pasta tossed with herbs and vegetables.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334547,"Continental [O]","Chicken Red Sause Pasta [o]",,"Chicken Red Sauce Pasta",item,0,"Juicy chicken pieces cooked in spicy and tangy red sauce.",non-veg,166[O],,,,,1,0,No,services,,Yes,,,Yes
1302334668,"Continental [O]","Chicken Red Sause Pasta [o] (Half)",Half,"Chicken Red Sauce Pasta",variation,249.00,"Juicy chicken pieces cooked in spicy and tangy red sauce.",non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334669,"Continental [O]","Chicken Red Sause Pasta [o] (Full)",Full,"Chicken Red Sauce Pasta",variation,389.00,"Juicy chicken pieces cooked in spicy and tangy red sauce.",non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334548,"Continental [O]","Veg Mix Sauce Pasta [o]",,"Veg Mixed Sauce Pasta",item,0,"A perfect fusion of red, white sauce and blended with vegetables.",veg,169[O],,,,,1,0,No,services,,Yes,,,Yes
1302334670,"Continental [O]","Veg Mix Sauce Pasta [o] (Half)",Half,"Veg Mixed Sauce Pasta",variation,249.00,"A perfect fusion of red, white sauce and blended with vegetables.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334671,"Continental [O]","Veg Mix Sauce Pasta [o] (Full)",Full,"Veg Mixed Sauce Pasta",variation,369.00,"A perfect fusion of red, white sauce and blended with vegetables.",veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334549,"Continental [O]","Chicken Mix Sauce Pasta [o]",,"Chicken Mixed Sauce Pasta",item,0,"A delightful mix of spicy red and creamy white sauce with chicken.",non-veg,172[O],,,,,1,0,No,services,,Yes,,,Yes
1302334672,"Continental [O]","Chicken Mix Sauce Pasta [o] (Half)",Half,"Chicken Mixed Sauce Pasta",variation,289.00,"A delightful mix of spicy red and creamy white sauce with chicken.",non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334673,"Continental [O]","Chicken Mix Sauce Pasta [o] (Full)",Full,"Chicken Mixed Sauce Pasta",variation,389.00,"A delightful mix of spicy red and creamy white sauce with chicken.",non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334550,"Continental [O]","Veg Mushroom Sauce Pasta [O]",,"Veg Mushroom Sauce Pasta",item,0,,veg,175[O],,,,,1,0,No,services,,Yes,,,Yes
1302334674,"Continental [O]","Veg Mushroom Sauce Pasta [O] (Half)",Half,"Veg Mushroom Sauce Pasta",variation,249.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334675,"Continental [O]","Veg Mushroom Sauce Pasta [O] (Full)",Full,"Veg Mushroom Sauce Pasta",variation,369.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334551,"Continental [O]","Chicken Sauce Pasta [O]",,"Chicken Sauce Pasta",item,0,,non-veg,178[O],,,,,1,0,No,services,,Yes,,,Yes
1302334676,"Continental [O]","Chicken Sauce Pasta [O] (Half)",Half,"Chicken Sauce Pasta",variation,289.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334677,"Continental [O]","Chicken Sauce Pasta [O] (Full)",Full,"Chicken Sauce Pasta",variation,389.00,,non-veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334552,"Continental [O]","Mushroom Sauce Pasta [O]",,"Mushroom Sauce Pasta",item,0,,veg,181[O],,,,,1,0,No,services,,Yes,,,Yes
1302334678,"Continental [O]","Mushroom Sauce Pasta [O] (Half)",Half,"Mushroom Sauce Pasta",variation,289.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334679,"Continental [O]","Mushroom Sauce Pasta [O] (Full)",Full,"Mushroom Sauce Pasta",variation,389.00,,veg,,,"	",,,1,0,No,services,,Yes,,,Yes
1302334553,"Thukpa [O]","Chicken Thukpa [o]",,"Chicken Thukpa",item,249.00,,non-veg,184[O],,,,,1,0,No,services,,Yes,,,Yes
1302334554,"Thukpa [O]","Veg Thukpa [O]",,"Veg Thukpa",item,199.00,,veg,185[O],,,,,1,0,No,services,,Yes,,,Yes
1302334555,"Thukpa [O]","Paneer Thukpa [o]",,"Paneer Thukpa",item,219.00,"A comforting noodles soup infused with paneer cubes and light spices.",veg,186[O],,,,,1,0,No,services,,Yes,,,Yes`;

const lines = csv.split('\n').slice(1); // skip header
const items = [];
let idCounter = 1;

for (const line of lines) {
  if (!line.trim()) continue;
  
  // Basic CSV parsing handling quotes
  const row = [];
  let inQuotes = false;
  let currentVal = '';
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      row.push(currentVal);
      currentVal = '';
    } else {
      currentVal += char;
    }
  }
  row.push(currentVal);

  const [
    petpooja_id, category, name, variation, online_display_name, item_type, price, description, dietary, short_code
  ] = row;

  items.push({
    id: 'm' + idCounter++,
    petpooja_id: petpooja_id || '',
    name: name || '',
    category: category || '',
    variation: variation || '',
    online_display_name: online_display_name || '',
    item_type: item_type || 'item',
    price: parseFloat(price) || 0,
    description: description || '',
    dietary: dietary || 'veg',
    short_code: short_code || '',
    portion_percentage: variation === 'Half' ? 50 : 100,
    created_at: new Date().toISOString()
  });
}

fs.writeFileSync('parsed_items.json', JSON.stringify(items, null, 2));
console.log('Done parsing ' + items.length + ' items');
