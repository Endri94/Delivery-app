
import EditDelivery from './EditDelivery.js';

const deliveryArr = [
    new EditDelivery("Ольга", "ул. Вымыслов, д. 12", 8, "delivered"),
    new EditDelivery("Дмитрий", "ул. Задачная, д. 7", 3, "delivery"),
    new EditDelivery("Оля", "ул. Ткачей, д. 43", 11, "cancelled"),
    new EditDelivery("Джошуа", "ул. Капитолия, д. 9", 29, "delivered"),
    new EditDelivery("Ольга", "ул. Вымыслов, д. 12", 8, "delivered"),
    new EditDelivery("Дмитрий", "ул. Задачная, д. 7", 3, "delivery"),
    new EditDelivery("Оля", "ул. Ткачей, д. 43", 11, "cancelled"),
    new EditDelivery("Джошуа", "ул. Капитолия, д. 9", 29, "delivered"),
];

const appEl = document.querySelector("#app");

function renderCards() {
    appEl.innerHTML = "";
    for (const delivery of deliveryArr) {
        appEl.append(delivery.getElement());
    }
}

renderCards();

// находим модалку и форму

const modal = document.querySelector("#modalForm");
const closeModalBtn = modal.querySelector(".closeModal");
const form = modal.querySelector("#changeForm");
// нажатие на крестик
closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("modal-form--active");
    window.currentEditingDelivery = null;
});

// сабмит формы
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!window.currentEditingDelivery) {
        return;
    }

    // находим инпуты и помещаем значения из карточки
    const nameVal = form.customerName.value.trim();
    const addressVal = form.customerAddress.value.trim();
    const distanceVal = Number(form.deliveryDistance.value);
    const statusVal = form.status.value;

    // валидация простая
    if (!nameVal || !addressVal || isNaN(distanceVal) || distanceVal < 0) {
        alert("Пожалуйста, введите корректные данные.");
        return;
    }

    // обновляем данные
    const inst = window.currentEditingDelivery;
    inst.name = nameVal;
    inst.address = addressVal;
    inst.distance = distanceVal;
    inst.status = statusVal;

    // обнолвляем карточку и отображение статуса (визуал)
    if (inst.cardEl) {
        inst.nameEl.textContent = inst.name;
        inst.addressEl.textContent = inst.address;
        inst.distanceEl.textContent = inst.distance + " км";
        inst.changeStatus(inst.status);
    }

    // скрываем модалку
    modal.classList.remove("modal-form--active");
    window.currentEditingDelivery = null;
});

// расстояние исключая отмененные доставки
const calculateTotalDistanceButton = document.querySelector("#calculateTotalDistance");
const totalDistanceResultElement = document.querySelector("#totalDistanceResult");

calculateTotalDistanceButton.addEventListener("click", () => {
    const totalDistance = EditDelivery.getTotalDistance(deliveryArr);
    totalDistanceResultElement.textContent = `Общее расстояние: ${totalDistance} км`;
    console.log(totalDistance);
});