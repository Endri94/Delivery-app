// editDelivery.js
import Delivery from './Delivery.js';

export default class EditDelivery extends Delivery {
    constructor(name, address, distance, status) {
        super(name, address, distance);
        this.status = status;
        this.cardEl = null;

        // создаем кнопку изменения там где нету статуса доставляется
        if (this.status !== 'delivery') {
            this.addButtonEl = this.getAddButtonEl();
        } else {
            this.addButtonEl = null;
        }
    }

    getAddButtonEl() {
        const btn = document.createElement("button");
        btn.classList.add("card__edit-button");
        btn.textContent = "Изменить";

        btn.addEventListener("click", () => this.openEditModal());

        return btn;
    }

    changeStatus(status) {
        const validStatus = ["delivery", "delivered", "cancelled"];
        if (validStatus.includes(status)) {
            this.status = status;
        } else {
            this.status = "delivery";
        }

        // показываем или скрываем кнопку изменить в зависимости от статуса
        if (this.status === 'delivery') {
            if (this.addButtonEl && this.addButtonEl.parentElement) {
                this.addButtonEl.parentElement.removeChild(this.addButtonEl);
            }
            this.addButtonEl = null;
        } else {
            if (!this.addButtonEl) {
                this.addButtonEl = this.getAddButtonEl();
                if (this.cardEl) {
                    this.cardEl.append(this.addButtonEl);
                }
            }
        }

        this.updateCardAppearance();
    }

    updateCardAppearance() {
        if (!this.cardEl) return;
        this.cardEl.className = "card";
        if (this.status === "delivered") {
            this.cardEl.classList.add("card--delivered");

        } else if (this.status === "cancelled") {
            this.cardEl.classList.add("card--cancelled");
        }
    }

    getElement() {
        const element = super.getElement();
        this.cardEl = element;
        if (this.addButtonEl) {
            element.append(this.addButtonEl);
        }
        this.updateCardAppearance();
        return element;
    }

    openEditModal() {
        const modal = document.querySelector("#modalForm");
        const form = modal.querySelector("#changeForm");
        const inputName = form.querySelector("#customerName");
        const inputAddress = form.querySelector("#customerAddress");
        const inputDistance = form.querySelector("#deliveryDistance");
        const inputStatus = form.querySelector("#statusSelect");

        inputName.value = this.name;
        inputAddress.value = this.address;
        inputDistance.value = this.distance;
        inputStatus.value = this.status;

        modal.classList.add("modal-form--active");
        modal.focus();

        window.currentEditingDelivery = this;
    }
    // статический метод рассчета расстояния
    static getTotalDistance(deliveries) {
        let totalDistance = 0;
        for (const delivery of deliveries) {
            if (delivery.status !== 'cancelled') {
                totalDistance += delivery.distance;
            }
        }
        return totalDistance;
    }
}

