import React from 'react'

// CSS
import './Rant.css';

// Material UI
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Props
interface Props {
    title: string,
    author?: string,
    authorTag?: string,
    createdAt?: string,
    body?: string
}

export const Rant: React.FC<Props> = ({title, authorTag}) => {
    return (
        <div className='rant-body'>
            <div className='rant-title'>
                <div className='rant-title-text'><h1>{title}</h1></div>
                <div className='more-icon'><MoreVertIcon style={{ color: 'white' }} /></div>
            </div>
            <div className='rant-credits'>
                <div className='rant-credits-img'><img alt = {authorTag} src='https://firebasestorage.googleapis.com/v0/b/rant-dd853.appspot.com/o/b04664e0-972c-11ea-90d7-2175f888ea40.jpg?alt=media'></img></div>
                <div className='rant-credits-info'>
                    <h2>AUTHOR</h2>
                    <h3>@author-tag</h3>
                </div>
                <div className='rant-credits-date'>
                    <h3>Created</h3>
                    <p>May 18th, 2018</p>
                    <p>9:00 PM</p>
                </div>
            </div>
            <div className='rant-content'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac tristique lacus. Suspendisse tellus libero, placerat a eros ut, dapibus ullamcorper augue. Sed vel ligula ut eros ullamcorper molestie at euismod ligula. Sed nunc nunc, volutpat id tellus et, tincidunt malesuada ex. Nullam sit amet neque leo. Aliquam porta magna ut mattis ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas eleifend lorem libero, maximus auctor ipsum eleifend sed. Nam a pellentesque mauris, quis finibus lorem. Integer quis dictum mi. Nullam sagittis, orci eu efficitur condimentum, nisi enim volutpat nunc, eu pharetra ipsum tellus ut sem. Sed a dapibus ex. Nulla condimentum iaculis felis, at dapibus felis. Donec sit amet ipsum et ante elementum hendrerit ac nec massa. Quisque egestas, tellus at porta cursus, quam odio pretium quam, eget euismod leo lectus eu neque.

Ut porta lectus nec justo efficitur, non aliquam mi consectetur. Duis at quam ut velit mattis auctor quis eget risus. Vestibulum sollicitudin risus a mauris rhoncus, laoreet commodo diam porttitor. Praesent quam dui, mollis id dictum non, maximus sit amet augue. Cras consectetur mi ut ligula mollis, nec venenatis leo mattis. Quisque et facilisis elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi fringilla tincidunt nisl, et sollicitudin nunc. Pellentesque vel vestibulum arcu. Fusce tincidunt orci quis hendrerit suscipit. Quisque magna nisi, maximus eget neque id, posuere semper massa.

Curabitur varius nisi a turpis faucibus imperdiet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum tincidunt diam a molestie. Ut auctor tempus ipsum sit amet finibus. Integer tristique nisl id malesuada ultrices. Nam varius aliquam nunc, eu porta lorem luctus a. Vestibulum volutpat, urna ac placerat molestie, ligula metus elementum ante, sit amet congue odio nisi in lacus. Nullam consequat tincidunt purus eu tincidunt. Donec vitae sollicitudin neque. Praesent nec tristique massa. Etiam vel auctor ex. Etiam id lacinia elit.

Mauris nunc nulla, auctor ac malesuada vitae, fringilla id eros. Fusce ornare sagittis varius. Nulla bibendum id felis vel aliquet. Integer ullamcorper tincidunt commodo. Aliquam efficitur orci purus, vel facilisis lacus pretium non. Sed ornare ornare libero non bibendum. Maecenas semper a urna nec rutrum. In quis aliquet felis, ornare placerat velit.

Praesent maximus dui vel leo euismod iaculis. Duis malesuada, nunc sed ultricies egestas, ipsum turpis fringilla diam, at porttitor eros nisl ut libero. Phasellus consequat elit ut placerat ultricies. Integer diam mauris, lacinia vel ipsum a, consequat rhoncus nibh. Sed tortor dui, interdum eu libero id, aliquam imperdiet lacus. In hac habitasse platea dictumst. Maecenas ante magna, molestie quis ullamcorper vitae, facilisis at justo. Suspendisse sed purus vitae diam finibus mollis nec vel odio. Aliquam non tincidunt arcu. Nullam et nisl scelerisque erat ornare scelerisque. Quisque auctor mollis felis et fringilla.</p>
            </div>
            <div className='comment-section'>

            </div>
        </div>
    )
}
