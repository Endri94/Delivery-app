// создание класса, для упрощенной работы с созданием карточек
export default class Delivery {


    // конструктор который упрощает работу с карточками в котором передаются аргументы присваивания
    constructor(name, address, distance) {
        this.name = name
        this.address = address
        this.distance = distance

    }
    // создание блока и строк для отрисовки для карточки
    getElement() {
        // обертка карточки
        this.cardEl = document.createElement('div')
        this.cardEl.classList.add('card');

        // заголовок Имя 
        this.titleName = document.createElement('span');
        this.titleName.classList.add('card__title-gray');
        this.titleName.textContent = 'Имя'
        // имя покупателя
        this.nameEl = document.createElement('h3')
        this.nameEl.classList.add('card__title-strong')
        this.nameEl.textContent = this.name
        // заголовок Адрес 
        this.titleAddress = document.createElement('span');
        this.titleAddress.classList.add('card__title-gray');
        this.titleAddress.textContent = 'Адрес';
        // Адрес покупателя
        this.addressEl = document.createElement('h3');
        this.addressEl.classList.add('card__title-strong');
        this.addressEl.textContent = this.address;
        // заголовок Расстояние 
        this.titleDistance = document.createElement('span');
        this.titleDistance.classList.add('card__title-gray');
        this.titleDistance.textContent = 'Расстояние'
        // Адрес покупателя
        this.distanceEl = document.createElement('h3')
        this.distanceEl.classList.add('card__title-strong')
        this.distanceEl.textContent = `${this.distance} км`


        this.cardEl.append(this.titleName, this.nameEl, this.titleAddress, this.addressEl, this.titleDistance, this.distanceEl)
        return this.cardEl
    }
    // геттер для получения расстояния
    get getDistance() {
        return this.distance;
    }

    // сеттер для изменения расстояния
    set setDistance(newDistance) {
        this.distance = newDistance;
    }

}