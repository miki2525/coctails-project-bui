import * as CoctailConstants from "./coctailConstants";
import {type} from "@testing-library/user-event/dist/type";

export const countOccurancesOfCoctailsType = (coctails) => {
    const typesArr = CoctailConstants.arrayType.map((type) => {
        return {
            name: type,
            value: 0
        }
    })

    typesArr.forEach((type) => {
        coctails.forEach((coctail) => {
            if (type.name === coctail.type) {
                type.value++;
            }
        });
    });
    return typesArr;
}

export const countOccurancesOfCoctailsGlasses = (coctails) => {

    const glassArr = CoctailConstants.arrayGlass.map((glass) => {
        return {
            name: glass,
            value: 0
        }
    });

    glassArr.forEach((glass) => {
        coctails.forEach((coctail) => {
            if (glass.name === coctail.glass) {
                glass.value++;
            }
        });
    });
    return glassArr;
}

export const getBarChartTypeData = (arrTypes) => {
    return {
        data: {
            labels: arrTypes.map((type) => type.name),
            datasets:
                [
                    {
                        label: "Zestawienie typów koktajli",
                        data: arrTypes.map((type) => type.value),
                        backgroundColor: [
                            "#f3ba2f",
                            "#2a71d0"
                        ]
                    }
                ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Types Chart'
                }
            },
            maintainAspectRatio: false,
            responsive:true,
            animation:{
                animateScale: true,
            }
        }
    }
}

export const getDoughnutChartGlassData = (arrGlasses) => {
    return {
        data: {
            labels: arrGlasses.map((glass) => glass.name),
            datasets:
                [
                    {
                        label: "Zestawienie szklanek użytych w opisanych koktajlach",
                        data: arrGlasses.map((glass) => glass.value),
                        //10 glasses for now todo (update it)
                        backgroundColor: [
                            'rgba(232,99,132,1)',
                            'rgba(232,211,6,1)',
                            'rgba(54,162,235,1)',
                            'rgba(255,159,64,1)',
                            'rgba(100,122,22,1)',
                            'rgba(15,12,25,1)',
                            'rgba(12,12,215,1)',
                            'rgba(99,99,99,1)',
                            'rgba(131,205,155,1)',
                            'rgba(220,89,1,1)'
                        ]
                    }
                ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Glass Chart'
                }
            },
            maintainAspectRatio: false,
            responsive:true,
            animation:{
                animateScale: true,
            }
        }
    }
}