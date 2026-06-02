import { ReportCardComponent } from "../../components/report-card/index.js";
import { ReportPage } from "../report/index.js";
import { ReportFormPage } from "../report-form/index.js";
import { reportApi } from "../../modules/reportApi.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <header class="site-header">
                <div class="container">
                    <div class="site-header-inner">
                        <h1 class="site-title">Отчёты по добыче ресурсов на Луне</h1>
                    </div>
                </div>
            </header>

            <div class="header-line"></div>

            <div class="container">
                <section class="hero-section">
                    <div class="hero-badge">Moon Resource Intelligence Platform</div>
                    <h2 class="hero-title">Отчёты лунной ресурсной программы</h2>
                    <p class="hero-text">
                        Каталог аналитических материалов по добыче и использованию ресурсов на Луне.
                    </p>
                </section>

                <section class="section">
                    <h2 class="section-title">Список отчётов</h2>
                    <p class="section-text">
                        Просмотр, фильтрация и переход к карточкам отчётов.
                    </p>

                    <div class="toolbar">
                        <input class="input" id="filter-title" type="text" placeholder="Введите название отчёта">
                        <button class="button" id="filter-button">Фильтровать</button>
                        <button class="button-secondary" id="reset-button">Сбросить</button>
                        <button class="button-secondary" id="add-button">Добавить отчёт</button>
                    </div>

                    <div id="request-error" class="error-note"></div>
                    <div id="main-page" class="cards-grid"></div>
                </section>
            </div>
        `;
    }

    bindToolbar() {
        document.getElementById('filter-button').addEventListener('click', () => {
            const title = document.getElementById('filter-title').value.trim();
            this.loadReports({ title });
        });

        document.getElementById('reset-button').addEventListener('click', () => {
            document.getElementById('filter-title').value = '';
            this.loadReports({});
        });

        document.getElementById('add-button').addEventListener('click', () => {
            const formPage = new ReportFormPage(this.parent, null);
            formPage.render();
        });
    }

    setError(message) {
        const errorNode = document.getElementById('request-error');
        if (errorNode) {
            errorNode.textContent = message || '';
        }
    }

    loadReports(filters = {}) {
        this.pageRoot.innerHTML = '';
        this.setError('');

        reportApi.getReports(filters, (data, status) => {
            if (status !== 200) {
                this.setError('Ошибка загрузки данных.');
                return;
            }

            if (!Array.isArray(data) || data.length === 0) {
                this.pageRoot.innerHTML = `<div class="info-note">По заданному фильтру записи не найдены.</div>`;
                return;
            }

            data.forEach(item => {
                const card = new ReportCardComponent(this.pageRoot);

                card.render(
                    item,
                    () => {
                        const reportPage = new ReportPage(this.parent, item.id);
                        reportPage.render();
                    },
                    () => {
                        const formPage = new ReportFormPage(this.parent, item.id);
                        formPage.render();
                    }
                );
            });
        });
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.bindToolbar();
        this.loadReports({});
    }
}