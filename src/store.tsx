import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, MasterMenuItem, Ingredient, Recipe, RecipeIngredient, Unit, Category } from './types';

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const INITIAL_STATE: AppState = {
  categories: [
    { id: 'c1', name: 'Starter [O]', created_at: new Date().toISOString() },
    { id: 'c2', name: 'Momo [O]', created_at: new Date().toISOString() },
    { id: 'c3', name: 'Noodles [O]', created_at: new Date().toISOString() },
    { id: 'c4', name: 'Rice [O]', created_at: new Date().toISOString() },
    { id: 'c5', name: 'Chaap [O]', created_at: new Date().toISOString() },
    { id: 'c6', name: 'Soup [O]', created_at: new Date().toISOString() },
    { id: 'c7', name: 'Continental [O]', created_at: new Date().toISOString() },
    { id: 'c8', name: 'Thukpa [O]', created_at: new Date().toISOString() },
  ],
  masterMenuItems: [
      {
          "id": "m1",
          "petpooja_id": "1302334557",
          "name": "Spring Roll Veg [o] (Half)",
          "category": "Starter [O]",
          "variation": "Half",
          "online_display_name": "Veg Spring Roll",
          "item_type": "variation",
          "price": 179,
          "description": "Crispy veg roll with a deliciously spiced vegetable filling.",
          "dietary": "veg",
          "short_code": "",
          "portion_percentage": 50,
          "created_at": "2026-03-25T08:01:12.469Z"
      },
      {
          "id": "m2",
          "petpooja_id": "1302334558",
          "name": "Spring Roll Veg [o] (Full)",
          "category": "Starter [O]",
          "variation": "Full",
          "online_display_name": "Veg Spring Roll",
          "item_type": "variation",
          "price": 289,
          "description": "Crispy veg roll with a deliciously spiced vegetable filling.",
          "dietary": "veg",
          "short_code": "",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.471Z"
      },
      {
          "id": "m3",
          "petpooja_id": "1302334493",
          "name": "Kurkure Spring Roll Veg [o]",
          "category": "Starter [O]",
          "variation": "",
          "online_display_name": "Veg Kurkure Spring Roll",
          "item_type": "item",
          "price": 0,
          "description": "Delightfully crispy roll loaded with seasoned veggies and served with chilli dip.",
          "dietary": "veg",
          "short_code": "4[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.471Z",
          "variations": [
              {
                  "id": "m4",
                  "name": "Half",
                  "price": 219,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334559"
              },
              {
                  "id": "m5",
                  "name": "Full",
                  "price": 329,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334560"
              }
          ]
      },
      {
          "id": "m6",
          "petpooja_id": "1302334494",
          "name": "Chilly Paneer [o]",
          "category": "Starter [O]",
          "variation": "",
          "online_display_name": "Chilli Paneer",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "7[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.471Z",
          "variations": [
              {
                  "id": "m7",
                  "name": "Half",
                  "price": 199,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334561"
              },
              {
                  "id": "m8",
                  "name": "Full",
                  "price": 299,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334562"
              }
          ]
      },
      {
          "id": "m9",
          "petpooja_id": "1302334495",
          "name": "Chilly Chicken [o]",
          "category": "Starter [O]",
          "variation": "",
          "online_display_name": "Chilli Chicken",
          "item_type": "item",
          "price": 0,
          "description": "Classic Indo Chinese chicken dish tossed with onion, capsicum and spicy sauce.",
          "dietary": "non-veg",
          "short_code": "10[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.471Z",
          "variations": [
              {
                  "id": "m10",
                  "name": "Half",
                  "price": 219,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334563"
              },
              {
                  "id": "m11",
                  "name": "Full",
                  "price": 319,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334564"
              }
          ]
      },
      {
          "id": "m12",
          "petpooja_id": "1302334496",
          "name": "Chilly Mushroom [o]",
          "category": "Starter [O]",
          "variation": "",
          "online_display_name": "Chilli Mushroom",
          "item_type": "item",
          "price": 0,
          "description": "Mushroom pieces tossed in tangy and spicy sauce with vegetables.",
          "dietary": "veg",
          "short_code": "13[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.471Z",
          "variations": [
              {
                  "id": "m13",
                  "name": "Half",
                  "price": 199,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334565"
              },
              {
                  "id": "m14",
                  "name": "Full",
                  "price": 299,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334566"
              }
          ]
      },
      {
          "id": "m15",
          "petpooja_id": "1302334497",
          "name": "Manchurian Veg [o]",
          "category": "Starter [O]",
          "variation": "",
          "online_display_name": "Veg Manchurian",
          "item_type": "item",
          "price": 0,
          "description": "Deep fried vegetable balls cooked in rich manchurian sauce.",
          "dietary": "veg",
          "short_code": "16[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.471Z",
          "variations": [
              {
                  "id": "m16",
                  "name": "Half",
                  "price": 189,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334567"
              },
              {
                  "id": "m17",
                  "name": "Full",
                  "price": 259,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334568"
              }
          ]
      },
      {
          "id": "m18",
          "petpooja_id": "1302334498",
          "name": "Honey Chilly Patoto [o]",
          "category": "Starter [O]",
          "variation": "",
          "online_display_name": "Honey Chilli Potato",
          "item_type": "item",
          "price": 0,
          "description": "Crispy potato fingers coated with honey and chilli glaze.",
          "dietary": "veg",
          "short_code": "19[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.471Z",
          "variations": [
              {
                  "id": "m19",
                  "name": "Half",
                  "price": 179,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334569"
              },
              {
                  "id": "m20",
                  "name": "Full",
                  "price": 259,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334570"
              }
          ]
      },
      {
          "id": "m21",
          "petpooja_id": "1302334499",
          "name": "Crispy Chilly Patoto [o]",
          "category": "Starter [O]",
          "variation": "",
          "online_display_name": "Crispy Chilli Potato",
          "item_type": "item",
          "price": 0,
          "description": "Deep fried potato tossed in spicy chilli sauce.",
          "dietary": "veg",
          "short_code": "22[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m22",
                  "name": "Half",
                  "price": 179,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334571"
              },
              {
                  "id": "m23",
                  "name": "Full",
                  "price": 259,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334572"
              }
          ]
      },
      {
          "id": "m24",
          "petpooja_id": "1302334500",
          "name": "Peri Peri Fries [o]",
          "category": "Starter [O]",
          "variation": "",
          "online_display_name": "Peri Peri French Fries",
          "item_type": "item",
          "price": 0,
          "description": "Crispy fries dusted with tangy and spicy peri peri masala.",
          "dietary": "veg",
          "short_code": "25[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m25",
                  "name": "Half",
                  "price": 159,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334573"
              },
              {
                  "id": "m26",
                  "name": "Full",
                  "price": 239,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334574"
              }
          ]
      },
      {
          "id": "m27",
          "petpooja_id": "1302334501",
          "name": "Crispy Peper Corn [o]",
          "category": "Starter [O]",
          "variation": "",
          "online_display_name": "Crispy Peper Corn",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "28[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m28",
                  "name": "Half",
                  "price": 199,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334575"
              },
              {
                  "id": "m29",
                  "name": "Full",
                  "price": 299,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334576"
              }
          ]
      },
      {
          "id": "m30",
          "petpooja_id": "1302334502",
          "name": "Drums Of Heaven [o]",
          "category": "Starter [O]",
          "variation": "",
          "online_display_name": "Drums of Heaven",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "non-veg",
          "short_code": "31[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m31",
                  "name": "Half",
                  "price": 249,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334577"
              },
              {
                  "id": "m32",
                  "name": "Full",
                  "price": 359,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334578"
              }
          ]
      },
      {
          "id": "m33",
          "petpooja_id": "1302334503",
          "name": "Veg Momo Steam [o]",
          "category": "Momo [O]",
          "variation": "",
          "online_display_name": "Veg Momos",
          "item_type": "item",
          "price": 0,
          "description": "Soft, flavorful momos packed with fresh mixed vegetables and authentic Himalayan spices.",
          "dietary": "veg",
          "short_code": "34[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m34",
                  "name": "Half",
                  "price": 149,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334580"
              },
              {
                  "id": "m35",
                  "name": "Full",
                  "price": 249,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334581"
              }
          ]
      },
      {
          "id": "m36",
          "petpooja_id": "1302334504",
          "name": "Paneer Momo Steam [O]",
          "category": "Momo [O]",
          "variation": "",
          "online_display_name": "Paneer Momo Steam",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "37[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m37",
                  "name": "Half",
                  "price": 179,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334582"
              },
              {
                  "id": "m38",
                  "name": "Full",
                  "price": 279,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334583"
              }
          ]
      },
      {
          "id": "m39",
          "petpooja_id": "1302334505",
          "name": "Veg Fried Momo [o]",
          "category": "Momo [O]",
          "variation": "",
          "online_display_name": "Veg Fried Momos",
          "item_type": "item",
          "price": 0,
          "description": "Classic vegetable momos fried to golden perfection and served with tangy dip.",
          "dietary": "veg",
          "short_code": "40[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m40",
                  "name": "Half",
                  "price": 199,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334584"
              },
              {
                  "id": "m41",
                  "name": "Full",
                  "price": 299,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334585"
              }
          ]
      },
      {
          "id": "m42",
          "petpooja_id": "1302334506",
          "name": "Chilli Momo Veg [o]",
          "category": "Momo [O]",
          "variation": "",
          "online_display_name": "Veg Chilli Momos",
          "item_type": "item",
          "price": 0,
          "description": "[Veg preparation] Spicy momos tossed with onion, capsicum and schezwan sauce.",
          "dietary": "veg",
          "short_code": "43[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m43",
                  "name": "Half",
                  "price": 219,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334586"
              },
              {
                  "id": "m44",
                  "name": "Full",
                  "price": 299,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334587"
              }
          ]
      },
      {
          "id": "m45",
          "petpooja_id": "1302334507",
          "name": "Chilli Momo Paneer [O]",
          "category": "Momo [O]",
          "variation": "",
          "online_display_name": "Chilli Momo Paneer",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "46[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m46",
                  "name": "Half",
                  "price": 199,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334588"
              },
              {
                  "id": "m47",
                  "name": "Full",
                  "price": 299,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334589"
              }
          ]
      },
      {
          "id": "m48",
          "petpooja_id": "1302334508",
          "name": "Chilly Momo Chicken [o]",
          "category": "Momo [O]",
          "variation": "",
          "online_display_name": "Chicken Chilli Momos",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "non-veg",
          "short_code": "49[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m49",
                  "name": "Half",
                  "price": 249,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334590"
              },
              {
                  "id": "m50",
                  "name": "Full",
                  "price": 339,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334591"
              }
          ]
      },
      {
          "id": "m51",
          "petpooja_id": "1302334509",
          "name": "Chicken Momo Steam [O]",
          "category": "Momo [O]",
          "variation": "",
          "online_display_name": "Chicken Momo Steam",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "non-veg",
          "short_code": "52[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m52",
                  "name": "Half",
                  "price": 199,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334592"
              },
              {
                  "id": "m53",
                  "name": "Full",
                  "price": 299,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334593"
              }
          ]
      },
      {
          "id": "m54",
          "petpooja_id": "1302334510",
          "name": "Fried Chicken Momo [o]",
          "category": "Momo [O]",
          "variation": "",
          "online_display_name": "Chicken Fried Momos",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "non-veg",
          "short_code": "55[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m55",
                  "name": "Half",
                  "price": 219,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334594"
              },
              {
                  "id": "m56",
                  "name": "Full",
                  "price": 299,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334595"
              }
          ]
      },
      {
          "id": "m57",
          "petpooja_id": "1302334511",
          "name": "Paneer Fried Momo [O]",
          "category": "Momo [O]",
          "variation": "",
          "online_display_name": "Paneer Fried Momo",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "58[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m58",
                  "name": "Half",
                  "price": 199,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334596"
              },
              {
                  "id": "m59",
                  "name": "Full",
                  "price": 299,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334597"
              }
          ]
      },
      {
          "id": "m60",
          "petpooja_id": "1302334512",
          "name": "Chicken Afghani Momo [o]",
          "category": "Momo [O]",
          "variation": "",
          "online_display_name": "Chicken Afghani Momo",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "non-veg",
          "short_code": "61[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m61",
                  "name": "Half",
                  "price": 239,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334598"
              },
              {
                  "id": "m62",
                  "name": "Full",
                  "price": 349,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334599"
              }
          ]
      },
      {
          "id": "m63",
          "petpooja_id": "1302334513",
          "name": "Paneer Afghani Momo [O]",
          "category": "Momo [O]",
          "variation": "",
          "online_display_name": "Paneer Afghani Momo",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "64[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m64",
                  "name": "Half",
                  "price": 239,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334600"
              },
              {
                  "id": "m65",
                  "name": "Full",
                  "price": 349,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334601"
              }
          ]
      },
      {
          "id": "m66",
          "petpooja_id": "1302334514",
          "name": "Veg Kurkure Momo [O]",
          "category": "Momo [O]",
          "variation": "",
          "online_display_name": "Veg Kurkure Momo",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "67[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m67",
                  "name": "Half",
                  "price": 199,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334602"
              },
              {
                  "id": "m68",
                  "name": "Full",
                  "price": 299,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334603"
              }
          ]
      },
      {
          "id": "m69",
          "petpooja_id": "1302334515",
          "name": "Chicken Kurkure Momo [o]",
          "category": "Momo [O]",
          "variation": "",
          "online_display_name": "Chicken Kurkure Momos",
          "item_type": "item",
          "price": 0,
          "description": "Crunchy, fried chicken momos with a crispy coating and juicy filling inside.",
          "dietary": "non-veg",
          "short_code": "70[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m70",
                  "name": "Half",
                  "price": 229,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334604"
              },
              {
                  "id": "m71",
                  "name": "Full",
                  "price": 329,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334605"
              }
          ]
      },
      {
          "id": "m72",
          "petpooja_id": "1302334516",
          "name": "Paneer Kurkure Momo [O]",
          "category": "Momo [O]",
          "variation": "",
          "online_display_name": "Paneer Kurkure Momo",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "73[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m73",
                  "name": "Half",
                  "price": 229,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334606"
              },
              {
                  "id": "m74",
                  "name": "Full",
                  "price": 329,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334607"
              }
          ]
      },
      {
          "id": "m75",
          "petpooja_id": "1302334517",
          "name": "Veg Tandoori Momo [O]",
          "category": "Momo [O]",
          "variation": "",
          "online_display_name": "Veg Tandoori Momo",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "76[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m76",
                  "name": "Half",
                  "price": 199,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334608"
              },
              {
                  "id": "m77",
                  "name": "Full",
                  "price": 299,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334609"
              }
          ]
      },
      {
          "id": "m78",
          "petpooja_id": "1302334518",
          "name": "Chicken Tandoori Momo [O]",
          "category": "Momo [O]",
          "variation": "",
          "online_display_name": "Chicken Tandoori Momo",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "non-veg",
          "short_code": "79[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m79",
                  "name": "Half",
                  "price": 239,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334610"
              },
              {
                  "id": "m80",
                  "name": "Full",
                  "price": 349,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334611"
              }
          ]
      },
      {
          "id": "m81",
          "petpooja_id": "1302334519",
          "name": "Paneer Tandoori Momo [O]",
          "category": "Momo [O]",
          "variation": "",
          "online_display_name": "Paneer Tandoori Momo",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "82[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m82",
                  "name": "Half",
                  "price": 239,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334612"
              },
              {
                  "id": "m83",
                  "name": "Full",
                  "price": 349,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334613"
              }
          ]
      },
      {
          "id": "m84",
          "petpooja_id": "1302334520",
          "name": "Veg Hakka Noodle [o]",
          "category": "Noodles [O]",
          "variation": "",
          "online_display_name": "Veg Hakka Noodles",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "85[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.472Z",
          "variations": [
              {
                  "id": "m85",
                  "name": "Half",
                  "price": 219,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334614"
              },
              {
                  "id": "m86",
                  "name": "Full",
                  "price": 299,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334615"
              }
          ]
      },
      {
          "id": "m87",
          "petpooja_id": "1302334521",
          "name": "Chilly Garlic Noodle [o]",
          "category": "Noodles [O]",
          "variation": "",
          "online_display_name": "Chilli Garlic Noodles",
          "item_type": "item",
          "price": 0,
          "description": "Zesty noodles tossed in chilli garlic sauce with crunchy veggies.",
          "dietary": "veg",
          "short_code": "88[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m88",
                  "name": "Half",
                  "price": 219,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334616"
              },
              {
                  "id": "m89",
                  "name": "Full",
                  "price": 299,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334617"
              }
          ]
      },
      {
          "id": "m90",
          "petpooja_id": "1302334522",
          "name": "Singapore Noodle Veg [o]",
          "category": "Noodles [O]",
          "variation": "",
          "online_display_name": "Veg Singapore Noodles",
          "item_type": "item",
          "price": 0,
          "description": "[Veg preparation] Thin noodles stir fried with curry flavor and mixed vegetables.",
          "dietary": "veg",
          "short_code": "91[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m91",
                  "name": "Half",
                  "price": 219,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334618"
              },
              {
                  "id": "m92",
                  "name": "Full",
                  "price": 299,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334619"
              }
          ]
      },
      {
          "id": "m93",
          "petpooja_id": "1302334523",
          "name": "Singapore Noodle Chicken [o]",
          "category": "Noodles [O]",
          "variation": "",
          "online_display_name": "Chicken Singapore Noodles",
          "item_type": "item",
          "price": 0,
          "description": "Spicy, aromatic noodles cooked with chicken and Asian spices.",
          "dietary": "non-veg",
          "short_code": "94[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m94",
                  "name": "Half",
                  "price": 249,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334620"
              },
              {
                  "id": "m95",
                  "name": "Full",
                  "price": 319,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334621"
              }
          ]
      },
      {
          "id": "m96",
          "petpooja_id": "1302334524",
          "name": "Paneer Noodle [o]",
          "category": "Noodles [O]",
          "variation": "",
          "online_display_name": "Paneer Noodles",
          "item_type": "item",
          "price": 0,
          "description": "Noodles tossed with soft paneer cubes and flavorful sauce.",
          "dietary": "veg",
          "short_code": "97[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m97",
                  "name": "Half",
                  "price": 239,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334622"
              },
              {
                  "id": "m98",
                  "name": "Full",
                  "price": 319,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334623"
              }
          ]
      },
      {
          "id": "m99",
          "petpooja_id": "1302334525",
          "name": "Egg Noodle [o]",
          "category": "Noodles [O]",
          "variation": "",
          "online_display_name": "Egg Noodles",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "egg",
          "short_code": "100[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m100",
                  "name": "Half",
                  "price": 219,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334624"
              },
              {
                  "id": "m101",
                  "name": "Full",
                  "price": 319,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334625"
              }
          ]
      },
      {
          "id": "m102",
          "petpooja_id": "1302334526",
          "name": "Chicken Noodle [O]",
          "category": "Noodles [O]",
          "variation": "",
          "online_display_name": "Chicken Noodle",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "non-veg",
          "short_code": "103[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m103",
                  "name": "Half",
                  "price": 249,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334626"
              },
              {
                  "id": "m104",
                  "name": "Full",
                  "price": 329,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334627"
              }
          ]
      },
      {
          "id": "m105",
          "petpooja_id": "1302334527",
          "name": "Chicken Egg Noodle [O]",
          "category": "Noodles [O]",
          "variation": "",
          "online_display_name": "Chicken Egg Noodle",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "non-veg",
          "short_code": "106[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m106",
                  "name": "Half",
                  "price": 259,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334628"
              },
              {
                  "id": "m107",
                  "name": "Full",
                  "price": 349,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334629"
              }
          ]
      },
      {
          "id": "m108",
          "petpooja_id": "1302334528",
          "name": "Veg Fried Rice [o]",
          "category": "Rice [O]",
          "variation": "",
          "online_display_name": "Veg Fried Rice",
          "item_type": "item",
          "price": 0,
          "description": "Classic fried rice with a mix of fresh veggies and soy seasoning.",
          "dietary": "veg",
          "short_code": "109[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m109",
                  "name": "Half",
                  "price": 249,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334630"
              },
              {
                  "id": "m110",
                  "name": "Full",
                  "price": 349,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334631"
              }
          ]
      },
      {
          "id": "m111",
          "petpooja_id": "1302334529",
          "name": "Schezwann Rice- Veg [o]",
          "category": "Rice [O]",
          "variation": "",
          "online_display_name": "Schezwan Fried Rice",
          "item_type": "item",
          "price": 0,
          "description": "[Veg preparation] Fiery schezwan style rice bursting with bold flavor.",
          "dietary": "veg",
          "short_code": "112[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m112",
                  "name": "Half",
                  "price": 249,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334632"
              },
              {
                  "id": "m113",
                  "name": "Full",
                  "price": 349,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334633"
              }
          ]
      },
      {
          "id": "m114",
          "petpooja_id": "1302334530",
          "name": "Schezwann Rice - Chicken [o]",
          "category": "Rice [O]",
          "variation": "",
          "online_display_name": "4 Chicken Schezwan Fried Rice",
          "item_type": "item",
          "price": 0,
          "description": "Spicy schezwan rice loaded with chicken and veggies.",
          "dietary": "non-veg",
          "short_code": "115[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m115",
                  "name": "Half",
                  "price": 269,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334634"
              },
              {
                  "id": "m116",
                  "name": "Full",
                  "price": 369,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334635"
              }
          ]
      },
      {
          "id": "m117",
          "petpooja_id": "1302334531",
          "name": "Paneer Fried Rice [o]",
          "category": "Rice [O]",
          "variation": "",
          "online_display_name": "Paneer Fried Rice",
          "item_type": "item",
          "price": 0,
          "description": "Fragrant rice stir fried with paneer cubes and oriental spices.",
          "dietary": "veg",
          "short_code": "118[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m118",
                  "name": "Half",
                  "price": 259,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334636"
              },
              {
                  "id": "m119",
                  "name": "Full",
                  "price": 369,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334637"
              }
          ]
      },
      {
          "id": "m120",
          "petpooja_id": "1302334532",
          "name": "Egg Fried Rice [o]",
          "category": "Rice [O]",
          "variation": "",
          "online_display_name": "Egg Fried Rice",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "egg",
          "short_code": "121[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m121",
                  "name": "Half",
                  "price": 259,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334638"
              },
              {
                  "id": "m122",
                  "name": "Full",
                  "price": 359,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334639"
              }
          ]
      },
      {
          "id": "m123",
          "petpooja_id": "1302334533",
          "name": "Chicken Fired Rice [O]",
          "category": "Rice [O]",
          "variation": "",
          "online_display_name": "Chicken Fired Rice",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "non-veg",
          "short_code": "124[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m124",
                  "name": "Half",
                  "price": 279,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334640"
              },
              {
                  "id": "m125",
                  "name": "Full",
                  "price": 379,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334641"
              }
          ]
      },
      {
          "id": "m126",
          "petpooja_id": "1302334534",
          "name": "Chicken Egg Rice [O]",
          "category": "Rice [O]",
          "variation": "",
          "online_display_name": "Chicken Egg Rice",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "non-veg",
          "short_code": "127[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m127",
                  "name": "Half",
                  "price": 289,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334642"
              },
              {
                  "id": "m128",
                  "name": "Full",
                  "price": 389,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334643"
              }
          ]
      },
      {
          "id": "m129",
          "petpooja_id": "1302334535",
          "name": "Masala Chaap [O]",
          "category": "Chaap [O]",
          "variation": "",
          "online_display_name": "Masala Chaap",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "130[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m130",
                  "name": "Half",
                  "price": 179,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334644"
              },
              {
                  "id": "m131",
                  "name": "Full",
                  "price": 279,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334645"
              }
          ]
      },
      {
          "id": "m132",
          "petpooja_id": "1302334536",
          "name": "Malai Chaap [O]",
          "category": "Chaap [O]",
          "variation": "",
          "online_display_name": "Malai Chaap",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "133[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m133",
                  "name": "Half",
                  "price": 199,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334646"
              },
              {
                  "id": "m134",
                  "name": "Full",
                  "price": 299,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334647"
              }
          ]
      },
      {
          "id": "m135",
          "petpooja_id": "1302334537",
          "name": "Tandoori Chaap [O]",
          "category": "Chaap [O]",
          "variation": "",
          "online_display_name": "Tandoori Chaap",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "136[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m136",
                  "name": "Half",
                  "price": 179,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334648"
              },
              {
                  "id": "m137",
                  "name": "Full",
                  "price": 279,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334649"
              }
          ]
      },
      {
          "id": "m138",
          "petpooja_id": "1302334538",
          "name": "Afghani Chaap [O]",
          "category": "Chaap [O]",
          "variation": "",
          "online_display_name": "Afghani Chaap",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "139[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m139",
                  "name": "Half",
                  "price": 199,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334650"
              },
              {
                  "id": "m140",
                  "name": "Full",
                  "price": 299,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334651"
              }
          ]
      },
      {
          "id": "m141",
          "petpooja_id": "1302334539",
          "name": "Kurkure Chaap [O]",
          "category": "Chaap [O]",
          "variation": "",
          "online_display_name": "Kurkure Chaap",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "142[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m142",
                  "name": "Half",
                  "price": 179,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334652"
              },
              {
                  "id": "m143",
                  "name": "Full",
                  "price": 279,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334653"
              }
          ]
      },
      {
          "id": "m144",
          "petpooja_id": "1302334540",
          "name": "Veg Sweetcorn Soup [O]",
          "category": "Soup [O]",
          "variation": "",
          "online_display_name": "Veg Sweetcorn Soup",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "145[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.473Z",
          "variations": [
              {
                  "id": "m145",
                  "name": "Half",
                  "price": 219,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334654"
              },
              {
                  "id": "m146",
                  "name": "Full",
                  "price": 219,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334655"
              }
          ]
      },
      {
          "id": "m147",
          "petpooja_id": "1302334541",
          "name": "Hot & Sour Soup [o]",
          "category": "Soup [O]",
          "variation": "",
          "online_display_name": "Hot and Sour Soup",
          "item_type": "item",
          "price": 0,
          "description": "A perfect balance of tangy, spicy flavor with vegetables and soy.",
          "dietary": "veg",
          "short_code": "148[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.474Z",
          "variations": [
              {
                  "id": "m148",
                  "name": "Half",
                  "price": 219,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334656"
              },
              {
                  "id": "m149",
                  "name": "Full",
                  "price": 219,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334657"
              }
          ]
      },
      {
          "id": "m150",
          "petpooja_id": "1302334542",
          "name": "Manchow Soup [o]",
          "category": "Soup [O]",
          "variation": "",
          "online_display_name": "Veg Manchow Soup",
          "item_type": "item",
          "price": 0,
          "description": "Thick, spicy soup with minced vegetables and served with crunchy noodles.",
          "dietary": "veg",
          "short_code": "151[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.474Z",
          "variations": [
              {
                  "id": "m151",
                  "name": "Half",
                  "price": 219,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334658"
              },
              {
                  "id": "m152",
                  "name": "Full",
                  "price": 219,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334659"
              }
          ]
      },
      {
          "id": "m153",
          "petpooja_id": "1302334543",
          "name": "Noodle Soup [o]",
          "category": "Soup [O]",
          "variation": "",
          "online_display_name": "Veg Noodles Soup",
          "item_type": "item",
          "price": 0,
          "description": "A hearty noodles based soup loaded with vegetables and Asian spices.",
          "dietary": "veg",
          "short_code": "154[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.474Z",
          "variations": [
              {
                  "id": "m154",
                  "name": "Half",
                  "price": 219,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334660"
              },
              {
                  "id": "m155",
                  "name": "Full",
                  "price": 219,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334661"
              }
          ]
      },
      {
          "id": "m156",
          "petpooja_id": "1302334544",
          "name": "Veg White Sauce Pasta [o]",
          "category": "Continental [O]",
          "variation": "",
          "online_display_name": "Veg White Sauce Pasta",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "157[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.474Z",
          "variations": [
              {
                  "id": "m157",
                  "name": "Half",
                  "price": 249,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334662"
              },
              {
                  "id": "m158",
                  "name": "Full",
                  "price": 369,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334663"
              }
          ]
      },
      {
          "id": "m159",
          "petpooja_id": "1302334545",
          "name": "Chicken White Sauce Pasta [O]",
          "category": "Continental [O]",
          "variation": "",
          "online_display_name": "Chicken White Sauce Pasta",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "non-veg",
          "short_code": "160[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.474Z",
          "variations": [
              {
                  "id": "m160",
                  "name": "Half",
                  "price": 289,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334664"
              },
              {
                  "id": "m161",
                  "name": "Full",
                  "price": 389,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334665"
              }
          ]
      },
      {
          "id": "m162",
          "petpooja_id": "1302334546",
          "name": "Veg Red Sause Pasta [o]",
          "category": "Continental [O]",
          "variation": "",
          "online_display_name": "Veg Red Sauce Pasta",
          "item_type": "item",
          "price": 0,
          "description": "Tangy tomato based pasta tossed with herbs and vegetables.",
          "dietary": "veg",
          "short_code": "163[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.474Z",
          "variations": [
              {
                  "id": "m163",
                  "name": "Half",
                  "price": 249,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334666"
              },
              {
                  "id": "m164",
                  "name": "Full",
                  "price": 369,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334667"
              }
          ]
      },
      {
          "id": "m165",
          "petpooja_id": "1302334547",
          "name": "Chicken Red Sause Pasta [o]",
          "category": "Continental [O]",
          "variation": "",
          "online_display_name": "Chicken Red Sauce Pasta",
          "item_type": "item",
          "price": 0,
          "description": "Juicy chicken pieces cooked in spicy and tangy red sauce.",
          "dietary": "non-veg",
          "short_code": "166[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.474Z",
          "variations": [
              {
                  "id": "m166",
                  "name": "Half",
                  "price": 249,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334668"
              },
              {
                  "id": "m167",
                  "name": "Full",
                  "price": 389,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334669"
              }
          ]
      },
      {
          "id": "m168",
          "petpooja_id": "1302334548",
          "name": "Veg Mix Sauce Pasta [o]",
          "category": "Continental [O]",
          "variation": "",
          "online_display_name": "Veg Mixed Sauce Pasta",
          "item_type": "item",
          "price": 0,
          "description": "A perfect fusion of red, white sauce and blended with vegetables.",
          "dietary": "veg",
          "short_code": "169[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.474Z",
          "variations": [
              {
                  "id": "m169",
                  "name": "Half",
                  "price": 249,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334670"
              },
              {
                  "id": "m170",
                  "name": "Full",
                  "price": 369,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334671"
              }
          ]
      },
      {
          "id": "m171",
          "petpooja_id": "1302334549",
          "name": "Chicken Mix Sauce Pasta [o]",
          "category": "Continental [O]",
          "variation": "",
          "online_display_name": "Chicken Mixed Sauce Pasta",
          "item_type": "item",
          "price": 0,
          "description": "A delightful mix of spicy red and creamy white sauce with chicken.",
          "dietary": "non-veg",
          "short_code": "172[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.474Z",
          "variations": [
              {
                  "id": "m172",
                  "name": "Half",
                  "price": 289,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334672"
              },
              {
                  "id": "m173",
                  "name": "Full",
                  "price": 389,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334673"
              }
          ]
      },
      {
          "id": "m174",
          "petpooja_id": "1302334550",
          "name": "Veg Mushroom Sauce Pasta [O]",
          "category": "Continental [O]",
          "variation": "",
          "online_display_name": "Veg Mushroom Sauce Pasta",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "175[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.474Z",
          "variations": [
              {
                  "id": "m175",
                  "name": "Half",
                  "price": 249,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334674"
              },
              {
                  "id": "m176",
                  "name": "Full",
                  "price": 369,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334675"
              }
          ]
      },
      {
          "id": "m177",
          "petpooja_id": "1302334551",
          "name": "Chicken Sauce Pasta [O]",
          "category": "Continental [O]",
          "variation": "",
          "online_display_name": "Chicken Sauce Pasta",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "non-veg",
          "short_code": "178[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.474Z",
          "variations": [
              {
                  "id": "m178",
                  "name": "Half",
                  "price": 289,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334676"
              },
              {
                  "id": "m179",
                  "name": "Full",
                  "price": 389,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334677"
              }
          ]
      },
      {
          "id": "m180",
          "petpooja_id": "1302334552",
          "name": "Mushroom Sauce Pasta [O]",
          "category": "Continental [O]",
          "variation": "",
          "online_display_name": "Mushroom Sauce Pasta",
          "item_type": "item",
          "price": 0,
          "description": "",
          "dietary": "veg",
          "short_code": "181[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.474Z",
          "variations": [
              {
                  "id": "m181",
                  "name": "Half",
                  "price": 289,
                  "portion_percentage": 50,
                  "petpooja_id": "1302334678"
              },
              {
                  "id": "m182",
                  "name": "Full",
                  "price": 389,
                  "portion_percentage": 100,
                  "petpooja_id": "1302334679"
              }
          ]
      },
      {
          "id": "m183",
          "petpooja_id": "1302334553",
          "name": "Chicken Thukpa [o]",
          "category": "Thukpa [O]",
          "variation": "",
          "online_display_name": "Chicken Thukpa",
          "item_type": "item",
          "price": 249,
          "description": "",
          "dietary": "non-veg",
          "short_code": "184[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.474Z",
          "variations": []
      },
      {
          "id": "m184",
          "petpooja_id": "1302334554",
          "name": "Veg Thukpa [O]",
          "category": "Thukpa [O]",
          "variation": "",
          "online_display_name": "Veg Thukpa",
          "item_type": "item",
          "price": 199,
          "description": "",
          "dietary": "veg",
          "short_code": "185[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.474Z",
          "variations": []
      },
      {
          "id": "m185",
          "petpooja_id": "1302334555",
          "name": "Paneer Thukpa [o]",
          "category": "Thukpa [O]",
          "variation": "",
          "online_display_name": "Paneer Thukpa",
          "item_type": "item",
          "price": 219,
          "description": "A comforting noodles soup infused with paneer cubes and light spices.",
          "dietary": "veg",
          "short_code": "186[O]",
          "portion_percentage": 100,
          "created_at": "2026-03-25T08:01:12.474Z",
          "variations": []
      }
  ],
  ingredients: [
      {
          "id": "ing_0",
          "name": "Cabbage",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.750Z"
      },
      {
          "id": "ing_1",
          "name": "Carrot",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_2",
          "name": "Capsicum",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_3",
          "name": "Onion",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_4",
          "name": "Garlic",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_5",
          "name": "Ginger",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_6",
          "name": "Green Chilli",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_7",
          "name": "Paneer",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_8",
          "name": "Chicken",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_9",
          "name": "Egg",
          "default_unit": "pcs",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_10",
          "name": "Mushroom",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_11",
          "name": "Soya Chaap",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_12",
          "name": "Soy Sauce",
          "default_unit": "ml",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_13",
          "name": "Vinegar",
          "default_unit": "ml",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_14",
          "name": "Chilli Sauce",
          "default_unit": "ml",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_15",
          "name": "Tomato Ketchup",
          "default_unit": "ml",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_16",
          "name": "Schezwan Sauce",
          "default_unit": "ml",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_17",
          "name": "White Sauce",
          "default_unit": "ml",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_18",
          "name": "Red Sauce",
          "default_unit": "ml",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_19",
          "name": "Corn Flour",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_20",
          "name": "Refined Oil",
          "default_unit": "ml",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_21",
          "name": "Spring Roll Sheet",
          "default_unit": "pcs",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_22",
          "name": "Momo Wrapper",
          "default_unit": "pcs",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_23",
          "name": "Noodles (Raw)",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_24",
          "name": "Rice (Basmati)",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_25",
          "name": "Pasta (Penne)",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_26",
          "name": "Potato",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_27",
          "name": "Honey",
          "default_unit": "ml",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_28",
          "name": "Peri Peri Masala",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_29",
          "name": "Cheese",
          "default_unit": "g",
          "created_at": "2026-03-25T08:25:19.751Z"
      },
      {
          "id": "ing_30",
          "name": "Veg Balls",
          "default_unit": "pcs",
          "created_at": "2026-03-25T08:25:19.751Z"
      }
  ],
  recipes: [
      {
          "id": "rec_1",
          "master_item_id": "m1",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_2",
          "master_item_id": "m2",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_3",
          "master_item_id": "m3",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_4",
          "master_item_id": "m6",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_5",
          "master_item_id": "m9",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_6",
          "master_item_id": "m12",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_7",
          "master_item_id": "m15",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_8",
          "master_item_id": "m18",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_9",
          "master_item_id": "m21",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_10",
          "master_item_id": "m24",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_11",
          "master_item_id": "m27",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_12",
          "master_item_id": "m30",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_13",
          "master_item_id": "m33",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_14",
          "master_item_id": "m36",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_15",
          "master_item_id": "m39",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_16",
          "master_item_id": "m42",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_17",
          "master_item_id": "m45",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_18",
          "master_item_id": "m48",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_19",
          "master_item_id": "m51",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_20",
          "master_item_id": "m54",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_21",
          "master_item_id": "m57",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_22",
          "master_item_id": "m60",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_23",
          "master_item_id": "m63",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_24",
          "master_item_id": "m66",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_25",
          "master_item_id": "m69",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_26",
          "master_item_id": "m72",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_27",
          "master_item_id": "m75",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_28",
          "master_item_id": "m78",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_29",
          "master_item_id": "m81",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_30",
          "master_item_id": "m84",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_31",
          "master_item_id": "m87",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_32",
          "master_item_id": "m90",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_33",
          "master_item_id": "m93",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_34",
          "master_item_id": "m96",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_35",
          "master_item_id": "m99",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_36",
          "master_item_id": "m102",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_37",
          "master_item_id": "m105",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_38",
          "master_item_id": "m108",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_39",
          "master_item_id": "m111",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_40",
          "master_item_id": "m114",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "rec_41",
          "master_item_id": "m117",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_42",
          "master_item_id": "m120",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_43",
          "master_item_id": "m123",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_44",
          "master_item_id": "m126",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_45",
          "master_item_id": "m129",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_46",
          "master_item_id": "m132",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_47",
          "master_item_id": "m135",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_48",
          "master_item_id": "m138",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_49",
          "master_item_id": "m141",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_50",
          "master_item_id": "m144",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_51",
          "master_item_id": "m147",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_52",
          "master_item_id": "m150",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_53",
          "master_item_id": "m153",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_54",
          "master_item_id": "m156",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_55",
          "master_item_id": "m159",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_56",
          "master_item_id": "m162",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_57",
          "master_item_id": "m165",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_58",
          "master_item_id": "m168",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_59",
          "master_item_id": "m171",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_60",
          "master_item_id": "m174",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_61",
          "master_item_id": "m177",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_62",
          "master_item_id": "m180",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_63",
          "master_item_id": "m183",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_64",
          "master_item_id": "m184",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "rec_65",
          "master_item_id": "m185",
          "created_at": "2026-03-25T08:25:19.753Z"
      }
  ],
  recipeIngredients: [
      {
          "id": "ri_1",
          "recipe_id": "rec_1",
          "ingredient_id": "ing_21",
          "quantity": 2,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_2",
          "recipe_id": "rec_1",
          "ingredient_id": "ing_0",
          "quantity": 25,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_3",
          "recipe_id": "rec_1",
          "ingredient_id": "ing_1",
          "quantity": 15,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_4",
          "recipe_id": "rec_1",
          "ingredient_id": "ing_20",
          "quantity": 25,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_5",
          "recipe_id": "rec_2",
          "ingredient_id": "ing_21",
          "quantity": 4,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_6",
          "recipe_id": "rec_2",
          "ingredient_id": "ing_0",
          "quantity": 50,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_7",
          "recipe_id": "rec_2",
          "ingredient_id": "ing_1",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_8",
          "recipe_id": "rec_2",
          "ingredient_id": "ing_20",
          "quantity": 50,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_9",
          "recipe_id": "rec_3",
          "ingredient_id": "ing_21",
          "quantity": 4,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_10",
          "recipe_id": "rec_3",
          "ingredient_id": "ing_0",
          "quantity": 50,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_11",
          "recipe_id": "rec_3",
          "ingredient_id": "ing_1",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_12",
          "recipe_id": "rec_3",
          "ingredient_id": "ing_20",
          "quantity": 50,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_13",
          "recipe_id": "rec_3",
          "ingredient_id": "ing_19",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_14",
          "recipe_id": "rec_4",
          "ingredient_id": "ing_3",
          "quantity": 40,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_15",
          "recipe_id": "rec_4",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_16",
          "recipe_id": "rec_4",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_17",
          "recipe_id": "rec_4",
          "ingredient_id": "ing_20",
          "quantity": 40,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_18",
          "recipe_id": "rec_4",
          "ingredient_id": "ing_7",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_19",
          "recipe_id": "rec_5",
          "ingredient_id": "ing_3",
          "quantity": 40,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_20",
          "recipe_id": "rec_5",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_21",
          "recipe_id": "rec_5",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_22",
          "recipe_id": "rec_5",
          "ingredient_id": "ing_20",
          "quantity": 40,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_23",
          "recipe_id": "rec_5",
          "ingredient_id": "ing_8",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_24",
          "recipe_id": "rec_6",
          "ingredient_id": "ing_3",
          "quantity": 40,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_25",
          "recipe_id": "rec_6",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_26",
          "recipe_id": "rec_6",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_27",
          "recipe_id": "rec_6",
          "ingredient_id": "ing_20",
          "quantity": 40,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_28",
          "recipe_id": "rec_6",
          "ingredient_id": "ing_10",
          "quantity": 120,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_29",
          "recipe_id": "rec_7",
          "ingredient_id": "ing_3",
          "quantity": 40,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_30",
          "recipe_id": "rec_7",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_31",
          "recipe_id": "rec_7",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_32",
          "recipe_id": "rec_7",
          "ingredient_id": "ing_20",
          "quantity": 40,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_33",
          "recipe_id": "rec_7",
          "ingredient_id": "ing_30",
          "quantity": 6,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_34",
          "recipe_id": "rec_8",
          "ingredient_id": "ing_3",
          "quantity": 40,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_35",
          "recipe_id": "rec_8",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_36",
          "recipe_id": "rec_8",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_37",
          "recipe_id": "rec_8",
          "ingredient_id": "ing_20",
          "quantity": 40,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_38",
          "recipe_id": "rec_9",
          "ingredient_id": "ing_3",
          "quantity": 40,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_39",
          "recipe_id": "rec_9",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_40",
          "recipe_id": "rec_9",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_41",
          "recipe_id": "rec_9",
          "ingredient_id": "ing_20",
          "quantity": 40,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_42",
          "recipe_id": "rec_10",
          "ingredient_id": "ing_3",
          "quantity": 40,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_43",
          "recipe_id": "rec_10",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_44",
          "recipe_id": "rec_10",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_45",
          "recipe_id": "rec_10",
          "ingredient_id": "ing_20",
          "quantity": 40,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_46",
          "recipe_id": "rec_10",
          "ingredient_id": "ing_26",
          "quantity": 200,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_47",
          "recipe_id": "rec_10",
          "ingredient_id": "ing_28",
          "quantity": 10,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_48",
          "recipe_id": "rec_11",
          "ingredient_id": "ing_3",
          "quantity": 40,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_49",
          "recipe_id": "rec_11",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_50",
          "recipe_id": "rec_11",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_51",
          "recipe_id": "rec_11",
          "ingredient_id": "ing_20",
          "quantity": 40,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_52",
          "recipe_id": "rec_11",
          "ingredient_id": "ing_19",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_53",
          "recipe_id": "rec_12",
          "ingredient_id": "ing_3",
          "quantity": 40,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_54",
          "recipe_id": "rec_12",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_55",
          "recipe_id": "rec_12",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_56",
          "recipe_id": "rec_12",
          "ingredient_id": "ing_20",
          "quantity": 40,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_57",
          "recipe_id": "rec_13",
          "ingredient_id": "ing_22",
          "quantity": 8,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_58",
          "recipe_id": "rec_13",
          "ingredient_id": "ing_0",
          "quantity": 60,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_59",
          "recipe_id": "rec_13",
          "ingredient_id": "ing_1",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_60",
          "recipe_id": "rec_14",
          "ingredient_id": "ing_22",
          "quantity": 8,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_61",
          "recipe_id": "rec_14",
          "ingredient_id": "ing_7",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_62",
          "recipe_id": "rec_15",
          "ingredient_id": "ing_22",
          "quantity": 8,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_63",
          "recipe_id": "rec_15",
          "ingredient_id": "ing_0",
          "quantity": 60,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_64",
          "recipe_id": "rec_15",
          "ingredient_id": "ing_1",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_65",
          "recipe_id": "rec_15",
          "ingredient_id": "ing_20",
          "quantity": 50,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_66",
          "recipe_id": "rec_16",
          "ingredient_id": "ing_22",
          "quantity": 8,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_67",
          "recipe_id": "rec_16",
          "ingredient_id": "ing_0",
          "quantity": 60,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_68",
          "recipe_id": "rec_16",
          "ingredient_id": "ing_1",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_69",
          "recipe_id": "rec_16",
          "ingredient_id": "ing_14",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_70",
          "recipe_id": "rec_16",
          "ingredient_id": "ing_2",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_71",
          "recipe_id": "rec_17",
          "ingredient_id": "ing_22",
          "quantity": 8,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_72",
          "recipe_id": "rec_17",
          "ingredient_id": "ing_7",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_73",
          "recipe_id": "rec_17",
          "ingredient_id": "ing_14",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_74",
          "recipe_id": "rec_17",
          "ingredient_id": "ing_2",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_75",
          "recipe_id": "rec_18",
          "ingredient_id": "ing_22",
          "quantity": 8,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_76",
          "recipe_id": "rec_18",
          "ingredient_id": "ing_8",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_77",
          "recipe_id": "rec_19",
          "ingredient_id": "ing_22",
          "quantity": 8,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_78",
          "recipe_id": "rec_19",
          "ingredient_id": "ing_8",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_79",
          "recipe_id": "rec_20",
          "ingredient_id": "ing_22",
          "quantity": 8,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_80",
          "recipe_id": "rec_20",
          "ingredient_id": "ing_8",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_81",
          "recipe_id": "rec_20",
          "ingredient_id": "ing_20",
          "quantity": 50,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_82",
          "recipe_id": "rec_21",
          "ingredient_id": "ing_22",
          "quantity": 8,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_83",
          "recipe_id": "rec_21",
          "ingredient_id": "ing_7",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_84",
          "recipe_id": "rec_21",
          "ingredient_id": "ing_20",
          "quantity": 50,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_85",
          "recipe_id": "rec_22",
          "ingredient_id": "ing_22",
          "quantity": 8,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_86",
          "recipe_id": "rec_22",
          "ingredient_id": "ing_8",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_87",
          "recipe_id": "rec_22",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_88",
          "recipe_id": "rec_23",
          "ingredient_id": "ing_22",
          "quantity": 8,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_89",
          "recipe_id": "rec_23",
          "ingredient_id": "ing_7",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_90",
          "recipe_id": "rec_23",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_91",
          "recipe_id": "rec_24",
          "ingredient_id": "ing_22",
          "quantity": 8,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_92",
          "recipe_id": "rec_24",
          "ingredient_id": "ing_0",
          "quantity": 60,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_93",
          "recipe_id": "rec_24",
          "ingredient_id": "ing_1",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_94",
          "recipe_id": "rec_24",
          "ingredient_id": "ing_20",
          "quantity": 50,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_95",
          "recipe_id": "rec_25",
          "ingredient_id": "ing_22",
          "quantity": 8,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_96",
          "recipe_id": "rec_25",
          "ingredient_id": "ing_8",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_97",
          "recipe_id": "rec_25",
          "ingredient_id": "ing_20",
          "quantity": 50,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_98",
          "recipe_id": "rec_26",
          "ingredient_id": "ing_22",
          "quantity": 8,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_99",
          "recipe_id": "rec_26",
          "ingredient_id": "ing_7",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_100",
          "recipe_id": "rec_26",
          "ingredient_id": "ing_20",
          "quantity": 50,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_101",
          "recipe_id": "rec_27",
          "ingredient_id": "ing_22",
          "quantity": 8,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_102",
          "recipe_id": "rec_27",
          "ingredient_id": "ing_0",
          "quantity": 60,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_103",
          "recipe_id": "rec_27",
          "ingredient_id": "ing_1",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_104",
          "recipe_id": "rec_27",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_105",
          "recipe_id": "rec_28",
          "ingredient_id": "ing_22",
          "quantity": 8,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_106",
          "recipe_id": "rec_28",
          "ingredient_id": "ing_8",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_107",
          "recipe_id": "rec_28",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_108",
          "recipe_id": "rec_29",
          "ingredient_id": "ing_22",
          "quantity": 8,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_109",
          "recipe_id": "rec_29",
          "ingredient_id": "ing_7",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_110",
          "recipe_id": "rec_29",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_111",
          "recipe_id": "rec_30",
          "ingredient_id": "ing_23",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_112",
          "recipe_id": "rec_30",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_113",
          "recipe_id": "rec_30",
          "ingredient_id": "ing_0",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_114",
          "recipe_id": "rec_30",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_115",
          "recipe_id": "rec_30",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_116",
          "recipe_id": "rec_31",
          "ingredient_id": "ing_23",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_117",
          "recipe_id": "rec_31",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_118",
          "recipe_id": "rec_31",
          "ingredient_id": "ing_0",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_119",
          "recipe_id": "rec_31",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_120",
          "recipe_id": "rec_31",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_121",
          "recipe_id": "rec_31",
          "ingredient_id": "ing_4",
          "quantity": 15,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_122",
          "recipe_id": "rec_31",
          "ingredient_id": "ing_14",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_123",
          "recipe_id": "rec_32",
          "ingredient_id": "ing_23",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_124",
          "recipe_id": "rec_32",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_125",
          "recipe_id": "rec_32",
          "ingredient_id": "ing_0",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_126",
          "recipe_id": "rec_32",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_127",
          "recipe_id": "rec_32",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_128",
          "recipe_id": "rec_32",
          "ingredient_id": "ing_7",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_129",
          "recipe_id": "rec_33",
          "ingredient_id": "ing_23",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_130",
          "recipe_id": "rec_33",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_131",
          "recipe_id": "rec_33",
          "ingredient_id": "ing_0",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_132",
          "recipe_id": "rec_33",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_133",
          "recipe_id": "rec_33",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_134",
          "recipe_id": "rec_33",
          "ingredient_id": "ing_8",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_135",
          "recipe_id": "rec_33",
          "ingredient_id": "ing_7",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_136",
          "recipe_id": "rec_34",
          "ingredient_id": "ing_23",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_137",
          "recipe_id": "rec_34",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_138",
          "recipe_id": "rec_34",
          "ingredient_id": "ing_0",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_139",
          "recipe_id": "rec_34",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_140",
          "recipe_id": "rec_34",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_141",
          "recipe_id": "rec_34",
          "ingredient_id": "ing_7",
          "quantity": 60,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_142",
          "recipe_id": "rec_35",
          "ingredient_id": "ing_23",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_143",
          "recipe_id": "rec_35",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_144",
          "recipe_id": "rec_35",
          "ingredient_id": "ing_0",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_145",
          "recipe_id": "rec_35",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_146",
          "recipe_id": "rec_35",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_147",
          "recipe_id": "rec_35",
          "ingredient_id": "ing_9",
          "quantity": 2,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_148",
          "recipe_id": "rec_36",
          "ingredient_id": "ing_23",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_149",
          "recipe_id": "rec_36",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_150",
          "recipe_id": "rec_36",
          "ingredient_id": "ing_0",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_151",
          "recipe_id": "rec_36",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_152",
          "recipe_id": "rec_36",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_153",
          "recipe_id": "rec_36",
          "ingredient_id": "ing_8",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_154",
          "recipe_id": "rec_37",
          "ingredient_id": "ing_23",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_155",
          "recipe_id": "rec_37",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_156",
          "recipe_id": "rec_37",
          "ingredient_id": "ing_0",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_157",
          "recipe_id": "rec_37",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_158",
          "recipe_id": "rec_37",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_159",
          "recipe_id": "rec_37",
          "ingredient_id": "ing_8",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_160",
          "recipe_id": "rec_37",
          "ingredient_id": "ing_9",
          "quantity": 2,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_161",
          "recipe_id": "rec_38",
          "ingredient_id": "ing_24",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_162",
          "recipe_id": "rec_38",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_163",
          "recipe_id": "rec_38",
          "ingredient_id": "ing_1",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_164",
          "recipe_id": "rec_38",
          "ingredient_id": "ing_12",
          "quantity": 10,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_165",
          "recipe_id": "rec_38",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_166",
          "recipe_id": "rec_39",
          "ingredient_id": "ing_24",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_167",
          "recipe_id": "rec_39",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_168",
          "recipe_id": "rec_39",
          "ingredient_id": "ing_1",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_169",
          "recipe_id": "rec_39",
          "ingredient_id": "ing_12",
          "quantity": 10,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_170",
          "recipe_id": "rec_39",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_171",
          "recipe_id": "rec_39",
          "ingredient_id": "ing_16",
          "quantity": 25,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.752Z"
      },
      {
          "id": "ri_172",
          "recipe_id": "rec_40",
          "ingredient_id": "ing_24",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_173",
          "recipe_id": "rec_40",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_174",
          "recipe_id": "rec_40",
          "ingredient_id": "ing_1",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_175",
          "recipe_id": "rec_40",
          "ingredient_id": "ing_12",
          "quantity": 10,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_176",
          "recipe_id": "rec_40",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_177",
          "recipe_id": "rec_40",
          "ingredient_id": "ing_8",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_178",
          "recipe_id": "rec_40",
          "ingredient_id": "ing_16",
          "quantity": 25,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_179",
          "recipe_id": "rec_41",
          "ingredient_id": "ing_24",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_180",
          "recipe_id": "rec_41",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_181",
          "recipe_id": "rec_41",
          "ingredient_id": "ing_1",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_182",
          "recipe_id": "rec_41",
          "ingredient_id": "ing_12",
          "quantity": 10,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_183",
          "recipe_id": "rec_41",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_184",
          "recipe_id": "rec_41",
          "ingredient_id": "ing_7",
          "quantity": 60,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_185",
          "recipe_id": "rec_42",
          "ingredient_id": "ing_24",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_186",
          "recipe_id": "rec_42",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_187",
          "recipe_id": "rec_42",
          "ingredient_id": "ing_1",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_188",
          "recipe_id": "rec_42",
          "ingredient_id": "ing_12",
          "quantity": 10,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_189",
          "recipe_id": "rec_42",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_190",
          "recipe_id": "rec_42",
          "ingredient_id": "ing_9",
          "quantity": 2,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_191",
          "recipe_id": "rec_43",
          "ingredient_id": "ing_24",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_192",
          "recipe_id": "rec_43",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_193",
          "recipe_id": "rec_43",
          "ingredient_id": "ing_1",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_194",
          "recipe_id": "rec_43",
          "ingredient_id": "ing_12",
          "quantity": 10,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_195",
          "recipe_id": "rec_43",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_196",
          "recipe_id": "rec_43",
          "ingredient_id": "ing_8",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_197",
          "recipe_id": "rec_44",
          "ingredient_id": "ing_24",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_198",
          "recipe_id": "rec_44",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_199",
          "recipe_id": "rec_44",
          "ingredient_id": "ing_1",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_200",
          "recipe_id": "rec_44",
          "ingredient_id": "ing_12",
          "quantity": 10,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_201",
          "recipe_id": "rec_44",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_202",
          "recipe_id": "rec_44",
          "ingredient_id": "ing_8",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_203",
          "recipe_id": "rec_44",
          "ingredient_id": "ing_9",
          "quantity": 2,
          "unit": "pcs",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_204",
          "recipe_id": "rec_45",
          "ingredient_id": "ing_11",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_205",
          "recipe_id": "rec_45",
          "ingredient_id": "ing_3",
          "quantity": 40,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_206",
          "recipe_id": "rec_45",
          "ingredient_id": "ing_20",
          "quantity": 30,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_207",
          "recipe_id": "rec_46",
          "ingredient_id": "ing_11",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_208",
          "recipe_id": "rec_46",
          "ingredient_id": "ing_3",
          "quantity": 40,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_209",
          "recipe_id": "rec_46",
          "ingredient_id": "ing_20",
          "quantity": 30,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_210",
          "recipe_id": "rec_46",
          "ingredient_id": "ing_29",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_211",
          "recipe_id": "rec_47",
          "ingredient_id": "ing_11",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_212",
          "recipe_id": "rec_47",
          "ingredient_id": "ing_3",
          "quantity": 40,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_213",
          "recipe_id": "rec_47",
          "ingredient_id": "ing_20",
          "quantity": 30,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_214",
          "recipe_id": "rec_48",
          "ingredient_id": "ing_11",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_215",
          "recipe_id": "rec_48",
          "ingredient_id": "ing_3",
          "quantity": 40,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_216",
          "recipe_id": "rec_48",
          "ingredient_id": "ing_20",
          "quantity": 30,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_217",
          "recipe_id": "rec_49",
          "ingredient_id": "ing_11",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_218",
          "recipe_id": "rec_49",
          "ingredient_id": "ing_3",
          "quantity": 40,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_219",
          "recipe_id": "rec_49",
          "ingredient_id": "ing_20",
          "quantity": 30,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_220",
          "recipe_id": "rec_49",
          "ingredient_id": "ing_19",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_221",
          "recipe_id": "rec_49",
          "ingredient_id": "ing_20",
          "quantity": 50,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_222",
          "recipe_id": "rec_50",
          "ingredient_id": "ing_19",
          "quantity": 15,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_223",
          "recipe_id": "rec_50",
          "ingredient_id": "ing_0",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_224",
          "recipe_id": "rec_50",
          "ingredient_id": "ing_1",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_225",
          "recipe_id": "rec_50",
          "ingredient_id": "ing_29",
          "quantity": 10,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_226",
          "recipe_id": "rec_51",
          "ingredient_id": "ing_19",
          "quantity": 15,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_227",
          "recipe_id": "rec_51",
          "ingredient_id": "ing_0",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_228",
          "recipe_id": "rec_51",
          "ingredient_id": "ing_1",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_229",
          "recipe_id": "rec_51",
          "ingredient_id": "ing_12",
          "quantity": 10,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_230",
          "recipe_id": "rec_51",
          "ingredient_id": "ing_14",
          "quantity": 10,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_231",
          "recipe_id": "rec_52",
          "ingredient_id": "ing_19",
          "quantity": 15,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_232",
          "recipe_id": "rec_52",
          "ingredient_id": "ing_0",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_233",
          "recipe_id": "rec_52",
          "ingredient_id": "ing_1",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_234",
          "recipe_id": "rec_52",
          "ingredient_id": "ing_12",
          "quantity": 10,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_235",
          "recipe_id": "rec_52",
          "ingredient_id": "ing_14",
          "quantity": 10,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_236",
          "recipe_id": "rec_53",
          "ingredient_id": "ing_23",
          "quantity": 150,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_237",
          "recipe_id": "rec_53",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_238",
          "recipe_id": "rec_53",
          "ingredient_id": "ing_0",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_239",
          "recipe_id": "rec_53",
          "ingredient_id": "ing_12",
          "quantity": 15,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_240",
          "recipe_id": "rec_53",
          "ingredient_id": "ing_20",
          "quantity": 20,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_241",
          "recipe_id": "rec_54",
          "ingredient_id": "ing_25",
          "quantity": 120,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_242",
          "recipe_id": "rec_54",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_243",
          "recipe_id": "rec_54",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_244",
          "recipe_id": "rec_54",
          "ingredient_id": "ing_29",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_245",
          "recipe_id": "rec_54",
          "ingredient_id": "ing_17",
          "quantity": 100,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_246",
          "recipe_id": "rec_55",
          "ingredient_id": "ing_25",
          "quantity": 120,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_247",
          "recipe_id": "rec_55",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_248",
          "recipe_id": "rec_55",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_249",
          "recipe_id": "rec_55",
          "ingredient_id": "ing_29",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_250",
          "recipe_id": "rec_55",
          "ingredient_id": "ing_17",
          "quantity": 100,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_251",
          "recipe_id": "rec_55",
          "ingredient_id": "ing_8",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_252",
          "recipe_id": "rec_56",
          "ingredient_id": "ing_25",
          "quantity": 120,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_253",
          "recipe_id": "rec_56",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_254",
          "recipe_id": "rec_56",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_255",
          "recipe_id": "rec_56",
          "ingredient_id": "ing_29",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_256",
          "recipe_id": "rec_56",
          "ingredient_id": "ing_18",
          "quantity": 100,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_257",
          "recipe_id": "rec_57",
          "ingredient_id": "ing_25",
          "quantity": 120,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_258",
          "recipe_id": "rec_57",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_259",
          "recipe_id": "rec_57",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_260",
          "recipe_id": "rec_57",
          "ingredient_id": "ing_29",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_261",
          "recipe_id": "rec_57",
          "ingredient_id": "ing_18",
          "quantity": 100,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_262",
          "recipe_id": "rec_57",
          "ingredient_id": "ing_8",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_263",
          "recipe_id": "rec_58",
          "ingredient_id": "ing_25",
          "quantity": 120,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_264",
          "recipe_id": "rec_58",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_265",
          "recipe_id": "rec_58",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_266",
          "recipe_id": "rec_58",
          "ingredient_id": "ing_29",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_267",
          "recipe_id": "rec_58",
          "ingredient_id": "ing_17",
          "quantity": 50,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_268",
          "recipe_id": "rec_58",
          "ingredient_id": "ing_18",
          "quantity": 50,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_269",
          "recipe_id": "rec_59",
          "ingredient_id": "ing_25",
          "quantity": 120,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_270",
          "recipe_id": "rec_59",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_271",
          "recipe_id": "rec_59",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_272",
          "recipe_id": "rec_59",
          "ingredient_id": "ing_29",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_273",
          "recipe_id": "rec_59",
          "ingredient_id": "ing_17",
          "quantity": 50,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_274",
          "recipe_id": "rec_59",
          "ingredient_id": "ing_18",
          "quantity": 50,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_275",
          "recipe_id": "rec_59",
          "ingredient_id": "ing_8",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_276",
          "recipe_id": "rec_60",
          "ingredient_id": "ing_25",
          "quantity": 120,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_277",
          "recipe_id": "rec_60",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_278",
          "recipe_id": "rec_60",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_279",
          "recipe_id": "rec_60",
          "ingredient_id": "ing_29",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_280",
          "recipe_id": "rec_60",
          "ingredient_id": "ing_17",
          "quantity": 80,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_281",
          "recipe_id": "rec_60",
          "ingredient_id": "ing_10",
          "quantity": 60,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_282",
          "recipe_id": "rec_61",
          "ingredient_id": "ing_25",
          "quantity": 120,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_283",
          "recipe_id": "rec_61",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_284",
          "recipe_id": "rec_61",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_285",
          "recipe_id": "rec_61",
          "ingredient_id": "ing_29",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_286",
          "recipe_id": "rec_61",
          "ingredient_id": "ing_17",
          "quantity": 80,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_287",
          "recipe_id": "rec_61",
          "ingredient_id": "ing_8",
          "quantity": 80,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_288",
          "recipe_id": "rec_62",
          "ingredient_id": "ing_25",
          "quantity": 120,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_289",
          "recipe_id": "rec_62",
          "ingredient_id": "ing_2",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_290",
          "recipe_id": "rec_62",
          "ingredient_id": "ing_3",
          "quantity": 30,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_291",
          "recipe_id": "rec_62",
          "ingredient_id": "ing_29",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_292",
          "recipe_id": "rec_62",
          "ingredient_id": "ing_17",
          "quantity": 80,
          "unit": "ml",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_293",
          "recipe_id": "rec_62",
          "ingredient_id": "ing_10",
          "quantity": 60,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_294",
          "recipe_id": "rec_63",
          "ingredient_id": "ing_19",
          "quantity": 15,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_295",
          "recipe_id": "rec_63",
          "ingredient_id": "ing_0",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_296",
          "recipe_id": "rec_63",
          "ingredient_id": "ing_1",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_297",
          "recipe_id": "rec_63",
          "ingredient_id": "ing_23",
          "quantity": 50,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_298",
          "recipe_id": "rec_63",
          "ingredient_id": "ing_8",
          "quantity": 50,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_299",
          "recipe_id": "rec_64",
          "ingredient_id": "ing_19",
          "quantity": 15,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_300",
          "recipe_id": "rec_64",
          "ingredient_id": "ing_0",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_301",
          "recipe_id": "rec_64",
          "ingredient_id": "ing_1",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_302",
          "recipe_id": "rec_64",
          "ingredient_id": "ing_23",
          "quantity": 50,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_303",
          "recipe_id": "rec_65",
          "ingredient_id": "ing_19",
          "quantity": 15,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_304",
          "recipe_id": "rec_65",
          "ingredient_id": "ing_0",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_305",
          "recipe_id": "rec_65",
          "ingredient_id": "ing_1",
          "quantity": 20,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_306",
          "recipe_id": "rec_65",
          "ingredient_id": "ing_23",
          "quantity": 50,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      },
      {
          "id": "ri_307",
          "recipe_id": "rec_65",
          "ingredient_id": "ing_7",
          "quantity": 40,
          "unit": "g",
          "created_at": "2026-03-25T08:25:19.753Z"
      }
  ],
  isLoading: true,
  error: null,
};

interface StoreContextType extends AppState {
  addCategory: (name: string, description?: string) => Promise<void>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addIngredient: (name: string, default_unit: Unit, description?: string) => Promise<void>;
  updateIngredient: (id: string, updates: Partial<Ingredient>) => Promise<void>;
  deleteIngredient: (id: string) => Promise<void>;
  addMasterMenuItem: (item: Omit<MasterMenuItem, 'id' | 'created_at'>) => Promise<void>;
  updateMasterMenuItem: (id: string, updates: Partial<MasterMenuItem>) => Promise<void>;
  deleteMasterMenuItem: (id: string) => Promise<void>;
  updateRecipe: (master_item_id: string, ingredients: Omit<RecipeIngredient, 'id' | 'recipe_id' | 'created_at'>[]) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('menu_manager_data_v4');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If the saved state has no master menu items, but our INITIAL_STATE does (meaning we just seeded it),
        // let's force the INITIAL_STATE to load so the user sees the demo data.
        if (parsed.masterMenuItems?.length === 0 && INITIAL_STATE.masterMenuItems.length > 0) {
          setState({ ...INITIAL_STATE, isLoading: false });
        } else {
          setState({ ...INITIAL_STATE, ...parsed, isLoading: false });
        }
      } catch (e) {
        console.error("Failed to parse local storage data", e);
        setState({ ...INITIAL_STATE, isLoading: false });
      }
    } else {
      setState({ ...INITIAL_STATE, isLoading: false });
    }
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    if (!state.isLoading) {
      const { isLoading, error, ...dataToSave } = state;
      localStorage.setItem('menu_manager_data_v4', JSON.stringify(dataToSave));
    }
  }, [state]);

  const addCategory = async (name: string, description?: string) => {
    const newCat: Category = {
      id: generateId(),
      name,
      description,
      created_at: new Date().toISOString()
    };
    setState(prev => ({ ...prev, categories: [...prev.categories, newCat] }));
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.map(cat => cat.id === id ? { ...cat, ...updates } : cat)
    }));
  };

  const deleteCategory = async (id: string) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat.id !== id)
    }));
  };

  const addIngredient = async (name: string, default_unit: Unit, description?: string) => {
    const newIng: Ingredient = {
      id: generateId(),
      name,
      default_unit,
      description,
      created_at: new Date().toISOString()
    };
    setState(prev => ({ ...prev, ingredients: [...prev.ingredients, newIng] }));
  };

  const updateIngredient = async (id: string, updates: Partial<Ingredient>) => {
    setState(prev => ({
      ...prev,
      ingredients: prev.ingredients.map(ing => ing.id === id ? { ...ing, ...updates } : ing)
    }));
  };

  const deleteIngredient = async (id: string) => {
    setState(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(ing => ing.id !== id),
      // Also remove from recipes
      recipeIngredients: prev.recipeIngredients.filter(ri => ri.ingredient_id !== id)
    }));
  };

  const addMasterMenuItem = async (item: Omit<MasterMenuItem, 'id' | 'created_at'>) => {
    const newItem: MasterMenuItem = {
      ...item,
      id: generateId(),
      created_at: new Date().toISOString()
    };
    setState(prev => ({ ...prev, masterMenuItems: [...prev.masterMenuItems, newItem] }));
  };

  const updateMasterMenuItem = async (id: string, updates: Partial<MasterMenuItem>) => {
    setState(prev => ({
      ...prev,
      masterMenuItems: prev.masterMenuItems.map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  const deleteMasterMenuItem = async (id: string) => {
    setState(prev => {
      const recipeIdsToRemove = prev.recipes.filter(r => r.master_item_id === id).map(r => r.id);
      return {
        ...prev,
        masterMenuItems: prev.masterMenuItems.filter(item => item.id !== id),
        recipes: prev.recipes.filter(r => r.master_item_id !== id),
        recipeIngredients: prev.recipeIngredients.filter(ri => !recipeIdsToRemove.includes(ri.recipe_id))
      };
    });
  };

  const updateRecipe = async (master_item_id: string, ingredients: Omit<RecipeIngredient, 'id' | 'recipe_id' | 'created_at'>[]) => {
    let recipe = state.recipes.find(r => r.master_item_id === master_item_id);
    let newRecipes = [...state.recipes];
    
    if (!recipe) {
      recipe = {
        id: generateId(),
        master_item_id,
        created_at: new Date().toISOString()
      };
      newRecipes.push(recipe);
    }

    const newIngredients: RecipeIngredient[] = ingredients.map(i => ({
      id: generateId(),
      recipe_id: recipe!.id,
      ingredient_id: i.ingredient_id,
      quantity: i.quantity,
      unit: i.unit,
      created_at: new Date().toISOString()
    }));

    setState(prev => ({
      ...prev,
      recipes: newRecipes,
      recipeIngredients: [
        ...prev.recipeIngredients.filter(ri => ri.recipe_id !== recipe!.id),
        ...newIngredients
      ]
    }));
  };

  return (
    <StoreContext.Provider value={{ 
      ...state, 
      addCategory,
      updateCategory,
      deleteCategory,
      addIngredient, 
      updateIngredient, 
      deleteIngredient, 
      addMasterMenuItem, 
      updateMasterMenuItem, 
      deleteMasterMenuItem, 
      updateRecipe 
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
