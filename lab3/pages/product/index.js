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
                sketchfabId: "c10049d9970d4f0abf88791a2f3d4275",
                description: "Базовая станция 4G обеспечивает стабильное покрытие на больших территориях благодаря высоте мачты 35 метров. Оборудование работает в экстремальных температурных условиях от -50°C до +50°C, что делает её идеальной для установки в любых климатических зонах. Станция поддерживает технологию MIMO 2x2, что повышает скорость передачи данных для конечных пользователей. Автоматическая система мониторинга позволяет удалённо управлять параметрами вещания и быстро реагировать на нештатные ситуации.",
                specs: "Частота: 1800 МГц | Мощность: 40 Вт | Защита: IP65 | Высота: 35 м"
            },
            2: {
                id: 2,
                title: "5G Мини-вышка",
                modelType: "5G Mini Tower",
                sketchfabId: "be31aa331d7a4ddcb30eafb2bee3dcde",
                description: "5G Мини-вышка специально разработана для установки на крышах жилых домов и столбах городского освещения, что позволяет быстро расширять покрытие без строительства новых мачт. Оборудование поддерживает технологию beamforming, которая направляет сигнал точно на устройства пользователей, снижая помехи и экономя энергию. Благодаря компактным размерам и весу всего 45 кг, монтаж занимает не более 2 часов. Вышка полностью защищена от пыли и влаги по стандарту IP65, что гарантирует бесперебойную работу в любую погоду.",
                specs: "Частота: 3500 МГц | Скорость: до 1 Гбит/с | Вес: 45 кг | Радиус: 500 м"
            },
            3: {
                id: 3,
                title: "Антенна MIMO",
                modelType: "MIMO Antenna",
                sketchfabId: "3dfd287c8fbc4db3b79531ed1d9b315d",
                description: "Антенна MIMO с конфигурацией 4x4 или 8x8 радикально меняет подход к передаче данных, используя несколько пространственных потоков одновременно. Установка этой антенны позволяет увеличить пропускную способность существующей инфраструктуры в 2-3 раза без дополнительных частот. Устройство работает в широком диапазоне частот от 1700 до 2700 МГц, что делает её универсальным решением для любых операторов. Коэффициент усиления 25 dBi обеспечивает уверенный приём даже на границе зоны покрытия, а интеллектуальная система адаптации автоматически подстраивается под помехи.",
                specs: "Конфигурация: 4x4/8x8 | Диапазон: 1700-2700 МГц | Усиление: 25 dBi"
            },
            4: {
                id: 4,
                title: "GPS/ГЛОНАСС вышка",
                modelType: "GPS/GLONASS Tower",
                sketchfabId: "9b51a01f9e41452ba7ab997bafb9dba2",
                description: "GPS/ГЛОНАСС вышка обеспечивает высокоточную синхронизацию времени для всех базовых станций в сети с погрешностью менее 100 наносекунд, что критически важно для бесшовного переключения между сотами. Оборудование одновременно работает с двумя спутниковыми системами (GPS и ГЛОНАСС), что гарантирует стабильный сигнал даже при сбоях одной из них. Встроенный резервный источник питания позволяет вышке работать автономно до 72 часов при отключении основного электропитания. Для корректной работы требуется прямая видимость неба, поэтому вышка обычно устанавливается на открытых площадках или крышах без высоких препятствий вокруг.",
                specs: "Погрешность: <100 нс | Питание: 72 часа резерва | Тип: GPS/GLONASS"
            }
        };

        return products[this.id] || products[1];
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        const data = this.getData();
        return `
            <div id="product-page" class="product-container">
                <div class="back-button-wrapper"></div>
                <div class="product-content">
                    <div class="product-header">
                        <h1 class="product-title">${data.title}</h1>
                        <p class="product-model">${data.modelType}</p>
                    </div>
                    <div class="product-3d-container" id="sketchfab-container-${this.id}">
                        <div style="display: flex; justify-content: center; align-items: center; height: 100%; color: #7dd3fc;">
                            Загрузка 3D модели...
                        </div>
                    </div>
                    <div class="product-info">
                        <h3>Описание</h3>
                        <p class="product-description">${data.description}</p>
                        <h3>Характеристики</h3>
                        <p class="product-specs">${data.specs}</p>
                    </div>
                </div>
            </div>
        `;
    }

    init3DModel() {
        const container = document.getElementById(`sketchfab-container-${this.id}`);
        if (!container) return;

        const data = this.getData();

        // Очищаем контейнер
        container.innerHTML = '';

        // Создаем iframe для Sketchfab
        const iframe = document.createElement('iframe');
        iframe.title = data.title;
        iframe.src = `https://sketchfab.com/models/${data.sketchfabId}/embed`;
        iframe.allow = "autoplay; fullscreen; xr-spatial-tracking";
        iframe.allowFullscreen = true;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";

        container.appendChild(iframe);
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButtonWrapper = document.querySelector('.back-button-wrapper');
        const backButton = new BackButtonComponent(backButtonWrapper);
        backButton.render(this.clickBack.bind(this));

        // Запускаем встраивание 3D модели
        setTimeout(() => {
            this.init3DModel();
        }, 100);
    }
}
