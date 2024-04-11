import { Component, Prop, State, h } from '@stencil/core';
@Component({
    tag: 'k-hub-tiles',
    styleUrl: 'k-hub-tiles.css',
    shadow: true,
})

export class kHubTiles {
    @Prop() tList: string
    @State() tiles = []
    @State() tilesClean = []
    @State() maincontent = []

    componentWillLoad() {

        Array.from(this.tList.split(",")).map(async (item) => {
            const response = await fetch(item);
            this.tiles.push(Array.from(await response.json()))
            this.tilesClean = this.tiles.flat(Infinity)
            this.maincontent = this.tilesClean.map(
                tile => (<div onClick={this.launch.bind(this, tile.url)}>{tile.title}</div>))
        })

    }


    launch(url) {
        window.location.href = url
    }

    render() {
        return [<section>{this.maincontent}</section>
        ]
    }

}