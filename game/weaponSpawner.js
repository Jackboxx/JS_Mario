import { Item } from "../engine/item.js";
import { Vector } from "../engine/vector.js";
import manager from './manager.js'

export class WeaponSpawner {
    constructor(spawnRate) {
        this.spawnRate = spawnRate;
        this.weaponList = ['shotgun', 'railgun'];
        this.spawnPoints = [
            new Vector(30, 280),
            new Vector(30, 440),
            new Vector(680, 280),
            new Vector(680, 440),
            new Vector(350, 140),
            new Vector(350, 340),
        ]
    }

    spawnWeapon() {
        if (Math.random() > (1 / this.spawnRate) || !manager.isJuiced() || manager.weaponExists()) return;

        const option = Math.floor(Math.random() * this.weaponList.length);
        const choice = Math.floor(Math.random() * this.spawnPoints.length);
        let item;

        switch (this.weaponList[option]) {
            case 'shotgun':
                item = new Item(this.spawnPoints[choice], new Vector(80, 40), this.weaponList[option], 'shotgun_r');
                break;
            case 'railgun':
                item = new Item(this.spawnPoints[choice], new Vector(100, 50), this.weaponList[option], 'railgun_r');
                break;
        }

        item.name = 'item_' + manager.currentItemID();
        manager.entities[item.name] = item;
        manager.increaseItemID();
        manager.setWeaponExists(true);
    }
}