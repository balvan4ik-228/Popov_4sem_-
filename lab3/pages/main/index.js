import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page"></div>
        `;
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://avatars.mds.yandex.net/i?id=6bc79ade09f73a54430344b4702d769639b907ee-5858120-images-thumbs&n=13",
                title: "Базовая станция 4G",
                text: "Стандарт LTE с частотой 1800 МГц. Радиус покрытия - до 3 км в городе. Поддерживает до 300 одновременных подключений. Высота вышки - 35 метров. Рабочая температура: от -50°C до +50°C."
            },
            {
                id: 2,
                src: "https://avatars.mds.yandex.net/i?id=150456f9cd3b6272fb8c2e0e0d5ddfe22baabfd2-7051380-images-thumbs&n=13",
                title: "5G Мини-вышка",
                text: "Компактная вышка для плотной городской застройки. Частота 3500 МГц, скорость до 1 Гбит/с. Радиус - 500 метров. Устанавливается на крышах и столбах освещения."
            },
            {
                id: 3,
                src: "https://avatars.mds.yandex.net/i?id=d7e045f0f8ac910f040c2609c473da56acae133f-10639895-images-thumbs&n=13",
                title: "Антенна MIMO",
                text: "Технология множественного ввода-вывода. Увеличивает пропускную способность в 2-3 раза. Используется в густонаселенных районах. Количество антенн: 4x4 или 8x8."
            },
            {
                id: 4,
                src: "https://avatars.mds.yandex.net/i?id=4720b7a5edf5c26fe6a7291ce81fb17f688735dc-4577151-images-thumbs&n=13",
                title: "GPS/ГЛОНАСС вышка",
                text: "Система синхронизации времени для всех вышек в сети. Погрешность - менее 100 наносекунд. Требует открытого неба для работы. Резервное питание - 72 часа."
            }
        ];
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}
