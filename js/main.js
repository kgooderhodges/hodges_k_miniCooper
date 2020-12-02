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

        // this is the lifecycle hook we want to target. Vue is done creating itself, and has attached itself to the "app" div on the the page. 

        // mounted events only fire once in it's lifecycle. You would need to use updated if it should fire more than once
        mounted: function() {
            console.log("Vue is mounted, trying a fetch for the initial data");
            // alert("Hey there! your vue instance is ready");
            fetchData("./includes/index.php")
                .then(data => {
                    data.forEach(minis => this.cars.push(minis));
                })
                .catch(err => console.error(err));
            // this is saying "Go grab THIS array, professors".
            // push says "Shove THIS array into this place". Push is an array method
        },
        
        // run a method when we change our view (update the DOM with Vue)
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
                // the "this" keyword inside a vue instance REFERS to the Vue instance itself
                // question mark is a shorthand for IF. This statement is saying if it's false, make it true. if it's true make it false.
                this.showCarData = this.showCarData ? false: true;
                // make the selected prof's data visible
                this.currentCarData = target;
            },
            
        }
    }).$mount("#app"); // this is a more common way of linking Vue to wrapper in HTML (the main #app)
})();