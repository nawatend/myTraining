import palette from 'theme/palette';

export const data = {
	labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug'],
	datasets: [{
		label: 'This year',
		backgroundColor: palette.primary.main,
		data: [4.2, 5, 3, 1.4]
	}]
};

export const options = {

	responsive: true,
	maintainAspectRatio: false,
	animation: false,
	legend: {
		display: false
	},
	cornerRadius: 2,
	tooltips: {
		enabled: true,
		mode: 'index',
		intersect: false,
		borderWidth: 1,
		borderColor: palette.divider,
		backgroundColor: palette.white,
		titleFontColor: palette.text.primary,
		bodyFontColor: palette.text.secondary,
		footerFontColor: palette.text.secondary
	},
	layout: {
		padding: 0
	},
	scales: {
		xAxes: [{
			barThickness: 40,
			maxBarThickness: 40,
			barPercentage: 0.5,
			categoryPercentage: 0.5,
			ticks: {
				fontColor: palette.text.secondary
			},
			gridLines: {
				display: false,
				drawBorder: false
			}
		}],
		yAxes: [{
			ticks: {
				fontColor: palette.text.secondary,
				beginAtZero: true,
				min: 0
			},
			gridLines: {
				borderDash: [2],
				borderDashOffset: [2],
				color: palette.divider,
				drawBorder: false,
				zeroLineBorderDash: [2],
				zeroLineBorderDashOffset: [2],
				zeroLineColor: palette.divider
			}
		}]
	}
};
