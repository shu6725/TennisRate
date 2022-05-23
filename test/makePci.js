

const myChart = new Chart((() => {
    return document.getElementById('myChart').getContext('2d');
})(), {
    type: 'line',
    data: {
        labels: ['2021-08-02T09:30:22.710731+09:00',
            '2021-08-02T11:10:22.710731+09:00',
            '2021-08-02T13:00:22.710731+09:00',
            '2021-08-02T15:00:22.710731+09:00',
            '2021-08-02T18:30:22.710731+09:00',
            '2021-08-02T19:50:22.710731+09:00'],

        datasets: [{
            label: '気温',
            data: [24.6, 26.8, 22.1, 28.5, 32.8, 29.0],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)'
        }]
    },
    options: {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                type: 'time',
                distribution: 'series'
            }]
        }
    }
});

myChart.toBase64Image()