import { Component, h, State, Prop } from "@stencil/core"



@Component({
    tag: 'k-hub-links',
    styleUrl: 'k-hub-links.css',
    shadow: true,
})

export class kHubLinks{

    @State() linksList: { title: string, url: string }[] = []
    @Prop() lList: string


    async componentWillLoad() {
        const response = await fetch(this.lList)
        const link = await response.json()
        this.linksList = await link.map(match => {
            return { title: match["title"], url: match["url"] }

        })
    }
    launch(url) {
        window.location.href = url
       
    }



    render() {
        let maincontent = this.linksList.map(link => (<div onClick={this.launch.bind(this, link.url)}>{link.title}</div>))

        return [<section>{maincontent}</section>

        ]
    }



   
}