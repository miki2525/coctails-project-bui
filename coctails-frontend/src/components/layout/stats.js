import React from 'react';
import TableTwoCol from "./stats/tableTwoCol";
import {Bar, Doughnut} from "react-chartjs-2";
import Chart from 'chart.js/auto';
import '../../styles/layout/stats.scss';
import '../../styles/layout/stats/table.scss';
import {useAppCtx} from "../../appContextProvider";
import {
    countOccurancesOfCoctailsType,
    countOccurancesOfCoctailsGlasses,
    getBarChartTypeData,
    getDoughnutChartGlassData
} from "../../utils/statisticMethods";

export default function Stats() {
    const {coctails} = useAppCtx();
    if (coctails.length < 1) {
        return (
            <div> Lista jest pusta </div>
        );
    }

    const arrayTypes = countOccurancesOfCoctailsType(coctails);
    const typeBarChart = getBarChartTypeData(arrayTypes);
    const arrayGlass = countOccurancesOfCoctailsGlasses(coctails);
    const glassDoughnutChart = getDoughnutChartGlassData(arrayGlass)

    return (
        <div className="statsContainer">
            <div>
                <h4>Zestawienie typów koktajli oraz ich sumy</h4>
                <div className="types">
                    <div>
                        <TableTwoCol className="tableTypes" data={arrayTypes} header1Title="Typ koktajlu"
                                     header2Title="Suma"/>
                    </div>
                    <div className="typeBarChart">
                        <Bar data={typeBarChart.data} width="200px" height="200px"/>
                    </div>
                </div>
            </div>
            <div>
                <h4>Zestawienie rodzajów szklanek użytych w opisanych koktajlach oraz ich sumy</h4>
                <div className="glasses">
                    <div>
                        <TableTwoCol className="tableGlasses" data={arrayGlass} header1Title="Nazwa szklanki"
                                     header2Title="Suma"/>
                    </div>
                    <div className="glassDoughnutChart">
                        <Doughnut data={glassDoughnutChart.data} width="200px" height="200px"/>
                    </div>
                </div>
            </div>
        </div>
    )


}