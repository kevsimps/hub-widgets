import { Component, Prop, State, h } from '@stencil/core';
@Component({
    tag: 'k-hub-tiles',
    styleUrl: 'k-hub-tiles.css',
    shadow: true,
})

export class kHubTiles {
    @State() tilesList: { title: string, url: string }[] = []
    @Prop() tList: string


    async componentWillLoad() {
        const response = await fetch(this.tList)
        const tiles = await response.json()
        this.tilesList = await tiles.map(match => {
            return { title: match["title"], url: match["url"] }

        })
    }
    launch(url) {
        window.location.href = url
    }



    render() {
        let maincontent = this.tilesList.map(
            tile => (<div onClick={this.launch.bind(this, tile.url)}>{tile.title}</div>))

        return [<section>{maincontent}</section>

        ]
    }

}