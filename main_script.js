class pong_game{

    initialize_output(){
        this.game_output_container = document.getElementById('game_output_container');
        this.game_output = document.getElementById('game_output');
        this.game_output_context = game_output.getContext('2d');
    }

    set_game_output_dimensions(){
        this.game_output.width = game_output_container.offsetWidth;
        this.game_output.height = game_output_container.offsetHeight;
    }

    set_objects() {
        this.object = [];
    }

    create_object({fill='', width=0, height=0, x_momentum=0, y_momentum=0, x_distance=0, y_distance=0, x_position=0, y_position=0, a={}}={}) {
        const default_fill = '#ffffff';
        const default_dimension = '';
        let object_index = this.object.length;
        this.object.push({});
        this.object[object_index].fill = (/^#[0-9A-F]{6}$/i.test(fill)) ? fill : default_fill;
        this.object[object_index].dimension = {'width': parseInt(width), 'height': parseInt(height)};

        this.object[object_index].keypress = 'a';
        this.object[object_index].momentum = {'x': x_momentum, 'y': y_momentum};
        this.object[object_index].distance = {'x': x_distance, 'y': y_distance};
        this.object[object_index].position = {'x': x_position, 'y': y_position};

        console.log(this.object)

    }

    b(){
        this.create_object({
            'fill': '#ffffff',
            'width': (parseInt(this.game_output.width) / 95),
            'height': (parseInt(this.game_output.height) / 10),
            'x_momentum': 0,
            'y_momentum': 0,
            'x_distance': 0,
            'y_distance': 0,
            'x_position': ((parseInt(this.game_output.width) / 95) * 2) + 0,
            'y_position': ((parseInt(this.game_output.height) / 2) - (parseInt(this.object[0].dimension.height) / 2)) + 0,
            'a': {'w': function(){this.object[object_index].momentum.y = -2.5}, 's': function(){this.object[object_index].momentum.y = 2.5}}
        })
    }

    update_object_properties() {
        for (let object_index = 0; object_index < this.object.length; object_index++) {
            this.object[object_index].distance.x += this.object[object_index].momentum.x;
            this.object[object_index].distance.y += this.object[object_index].momentum.y;

            //

            this.object[0].dimension = {'width': (parseInt(this.game_output.width) / 95), 'height': (parseInt(this.game_output.height) / 10)};
            this.object[0].position = {'x': ((parseInt(this.game_output.width) / 95) * 2) + this.object[0].distance.x, 'y': ((parseInt(this.game_output.height) / 2) - (parseInt(this.object[0].dimension.height) / 2)) + this.object[0].distance.y};


            //this.object[1].dimension = {'width': (parseInt(this.game_output.width) / 95), 'height': (parseInt(this.game_output.height) / 10)};
            //this.object[1].position = {'x': (parseInt(this.game_output.width) - (parseInt(this.game_output.width) / 95) * 3) + this.object[object_index].distance.x, 'y': ((parseInt(this.game_output.height) / 2) - (parseInt(this.object[object_index].dimension.height) / 2)) + this.object[object_index].distance.y};





            // + add back collision detection

            // + add key mapping to object creation

        }
    }


    move_object_listener(){

        for (let object_index = 0; object_index < this.object.length; object_index++){
            this.object[object_index].distance.x = 0;
            this.object[object_index].distance.y = 0;
        }

        document.addEventListener('keydown', function(event){
            if (event.key == 'w') {
                this.object[0].momentum.y = -2.5;
                //make momentum variable by framerate
                // same movement speed across all framerates
                // divide by framerate ?
            }
            if (event.key == 's') {
                this.object[0].momentum.y = 2.5;
            }
            if (event.key == 'ArrowUp') {
                this.object[1].momentum.y = -2.5;
            }
            if (event.key == 'ArrowDown') {
                this.object[1].momentum.y = 2.5;
            }
        }.bind(this));

        document.addEventListener('keyup', function(event){
            if (event.key == 'w') {
                this.object[0].momentum.y = 0;
            }
            if (event.key == 's') {
                this.object[0].momentum.y = 0;
            }
            if (event.key == 'ArrowUp') {
                this.object[1].momentum.y = 0;
            }
            if (event.key == 'ArrowDown') {
                this.object[1].momentum.y = 0;
            }
        }.bind(this));

    }

    render_backdrop({backdrop_fill=''}={}){
        const default_backdrop_fill = '#000000';
        let backdrop_fill_input = (/^#[0-9A-F]{6}$/i.test(backdrop_fill)) ? backdrop_fill : default_backdrop_fill;
        this.game_output_context.fillStyle = '#ffffff'
        this.game_output_context.fillRect(0, 0, this.game_output.width, this.game_output.height);
        this.game_output_context.fillStyle = backdrop_fill_input;
        this.game_output_context.fillRect((parseInt(this.game_output.width) / 95), (parseInt(this.game_output.width) / 95), this.game_output.width - (parseInt(this.game_output.width) / 95) * 2, this.game_output.height - (parseInt(this.game_output.width) / 95) * 2);
    }

    render_rectangle({fill='', x_position='', y_position='', width='', height=''}={}){
        const default_fill = '#ffffff';
        let fill_input = (/^#[0-9A-F]{6}$/i.test(fill)) ? fill : default_fill;
        let position_input = {'x': parseInt(x_position), 'y': parseInt(y_position)}
        let dimension_input = {'width': parseInt(width), 'height': parseInt(height)}
        this.game_output_context.fillStyle = fill_input;
        this.game_output_context.fillRect(position_input.x, position_input.y, dimension_input.width, dimension_input.height);  
    }

    render_objects() {
        for (let object_index = 0; object_index < this.object.length; object_index++) {
            console.log({fill: this.object[object_index].fill, x_position: this.object[object_index].position.x, y_position: this.object[object_index].position.y, width: this.object[object_index].dimension.width, height: this.object[object_index].dimension.height});
            this.render_rectangle({fill: this.object[object_index].fill, x_position: this.object[object_index].position.x, y_position: this.object[object_index].position.y, width: this.object[object_index].dimension.width, height: this.object[object_index].dimension.height});
        }
        /////
    }

    render_display(){
        this.set_game_output_dimensions();
        this.render_backdrop();
        this.render_objects();
        this.update_object_properties();   
    }

    set_framerate({framerate=0}={}){
        const default_framerate = 30;
        let framerate_input = (parseInt(framerate) != NaN) ? framerate : default_framerate;
        clearInterval(this.render_loop);
        this.render_loop = window.setInterval(function(){this.render_display()}.bind(this), (1000 / framerate_input));
    }

    constructor({debug=false}={}) {
        this.initialize_output();
        this.set_game_output_dimensions();
        this.set_objects();
        this.b();
        this.move_object_listener(); 

        
        this.update_object_properties();
        
        this.set_framerate({'framerate':60});
        
        this.render_display();
        
        
    }
}

const pong = new pong_game;
