// this variable is pointing to the vue engine, so we are linking Vue to an element in our HTML
import { fetchData } from "./components/DataMiner.js";

(() => {
    let vue_vm = new Vue({
        data: {
            title: "Mini Cooper Collection 2021",
            subtitle: "Check Them Out",
            removeAformat: true,
            showCarData: false,
            currentCarData: {},

            cars: []
        },

        // mounted events only fire once in it's lifecycle. You would need to use updated if it should fire more than once
        mounted: function() {
            console.log("Vue has mounted");

            fetchData("./includes/index.php")
                .then(data => {
                    data.forEach(minis => this.cars.push(minis));
                })
                .catch(err => console.error(err));
            // push says "Shove THIS array into this place". Push is an array method
        },
        
        // run a method when we change our view
        updated: function() {
            console.log('Vue just updated the DOM');
        },

        // event handling with methods object, then connect the index and this method
        methods: {
            logClicked() {
                console.log("clicked on a mini");
            },

            // this connects to the H1
            clickHeader() {
                console.log("oof my head");

            
            },

            showMiniData(target) {
                // show this prof from the professors array 
                console.log("clicked to view mini data", target, target.name);

                this.showCarData = this.showCarData ? false: true;
                // make the selected prof's data visible
                this.currentCarData = target;
            },
            
        }
    }).$mount("#app"); 
})();