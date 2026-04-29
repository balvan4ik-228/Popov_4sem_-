import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const products = {
            1: {
                id: 1,
                title: "Базовая станция 4G",
                modelType: "4G Base Station",
                description: "Стандарт LTE с частотой 1800 МГц. Радиус покрытия - до 3 км в городе. Поддерживает до 300 одновременных подключений. Высота вышки - 35 метров. Рабочая температура: от -50°C до +50°C.",
                specs: "Частота: 1800 МГц | Мощность: 40 Вт | Защита: IP65"
            },
            2: {
                id: 2,
                title: "5G Мини-вышка",
                modelType: "5G Mini Tower",
                description: "Компактная вышка для плотной городской застройки. Частота 3500 МГц, скорость до 1 Гбит/с. Радиус - 500 метров. Устанавливается на крышах и столбах освещения.",
                specs: "Частота: 3500 МГц | Скорость: до 1 Гбит/с | Вес: 45 кг"
            },
            3: {
                id: 3,
                title: "Антенна MIMO",
                modelType: "MIMO Antenna",
                description: "Технология множественного ввода-вывода. Увеличивает пропускную способность в 2-3 раза. Используется в густонаселенных районах. Количество антенн: 4x4 или 8x8.",
                specs: "Конфигурация: 4x4/8x8 | Диапазон: 1700-2700 МГц | Усиление: 25 dBi"
            }
        };

        return products[this.id] || products[1];
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page" class="product-container">
                <div class="back-button-wrapper"></div>
                <div class="product-content">
                    <div class="product-header">
                        <h1 class="product-title">${this.getData().title}</h1>
                        <p class="product-model">${this.getData().modelType}</p>
                    </div>
                    <div class="product-3d-container">
                        <canvas id="product-canvas-${this.id}" class="product-canvas-3d"></canvas>
                    </div>
                    <div class="product-info">
                        <h3>Описание</h3>
                        <p class="product-description">${this.getData().description}</p>
                        <h3>Характеристики</h3>
                        <p class="product-specs">${this.getData().specs}</p>
                    </div>
                </div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    init3DModel() {
        const canvas = document.getElementById(`product-canvas-${this.id}`);
        if (!canvas) return;

        const data = this.getData();

        // Настройка canvas для 3D отображения
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        const ctx = canvas.getContext('2d');

        // Функция анимации для 3D эффекта
        let rotation = 0;

        function draw3DAntenna() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Градиентный фон
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#0a0f1e');
            gradient.addColorStop(1, '#0d1425');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const size = Math.min(canvas.width, canvas.height) * 0.3;

            rotation += 0.02;

            // Рисуем 3D антенну (стилизованная)
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(rotation);

            // Основная мачта
            ctx.fillStyle = '#c0c0c0';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#38bdf8';
            ctx.fillRect(-10, -size, 20, size * 2);

            // Антенна (верхняя часть)
            ctx.fillStyle = '#e0e0e0';
            ctx.beginPath();
            ctx.moveTo(-15, -size);
            ctx.lineTo(0, -size - 40);
            ctx.lineTo(15, -size);
            ctx.fill();

            // Приемники
            ctx.fillStyle = '#38bdf8';
            for(let i = 0; i < 4; i++) {
                const angle = (i * Math.PI * 2) / 4;
                const x = Math.cos(angle) * 25;
                const y = Math.sin(angle) * 25;
                ctx.beginPath();
                ctx.arc(x, y - size/2, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#7dd3fc';
            }

            // Волновые эффекты
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2;
            for(let i = 0; i < 3; i++) {
                const radius = 40 + i * 15 + Math.sin(Date.now() * 0.003 + i) * 5;
                ctx.beginPath();
                ctx.arc(0, -size/2, radius, 0, Math.PI * 2);
                ctx.stroke();
            }

            ctx.restore();

            // Текст с названием модели
            ctx.fillStyle = '#e0f2fe';
            ctx.font = 'bold 16px Inter';
            ctx.textAlign = 'center';
            ctx.shadowBlur = 0;
            ctx.fillText(data.modelType, centerX, centerY + size + 30);

            requestAnimationFrame(draw3DAntenna);
        }

        draw3DAntenna();

        // Обработка изменения размера окна
        window.addEventListener('resize', () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButtonWrapper = document.querySelector('.back-button-wrapper');
        const backButton = new BackButtonComponent(backButtonWrapper);
        backButton.render(this.clickBack.bind(this));

        // Запускаем 3D анимацию после рендера
        setTimeout(() => {
            this.init3DModel();
        }, 100);
    }
}
