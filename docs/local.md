---
title: Local browsing
---
# Local browsing

This page explains how to browse and edit the website locally.
In case of difficulties, see more on [Testing your GitHub Pages site locally with Jekyll].

## Requirements

- [Ruby] 2.6.5 or >= 2.7.2
    
- [Jekyll] 3.9.x or 4.x

## Setting up

1.  Clone or download a zip of the [cbs-latex repository].

2.  Run the following commands in a terminal from the `cbs-latex` directory:
    
    ```bash
    bundle update
    bundle exec jekyll serve
    ```
    
    The default port `4000` can be overridden using `bundle exec jekyll serve --port ....`.

## Browsing

Open a web browser at <http://localhost:4000/cbs-latex/> (the final `/` is required).

Stop the local server with `Control-C` when no longer needed.

## Editing

Jekyll updates the web pages when you change the Markdown files (it takes a few seconds).

## Colors

The CBS highlighting colors can be changed by editing the SCSS files in `_sass/custom`.[^colors]

{:.note}
> When browsing these web pages on GitHub, the color scheme can be toggled between `light` and `dark`.

The toggle button is at the top of the navigation panel.

For local browsing, the following configuration options are provided:

`color_scheme`
: set to `dark` to disable the `light` scheme

`toggle_color_scheme`
: set to `dark` to support toggling between `light` and `dark`

`toggle_page_url`
: leave unset to display the toggle button on all pages

`toggle_auto_mode`
: set to `true` to toggle automatically when the system mode preference changes

`toggle_text_1`
: set the label on the button for changing to the `dark` scheme

`toggle_text_2`
: set the label on the button for changing to the `light` scheme

----

[^colors]:
    The current highlighting colors should be distinguishable to users with Deuteranopia
    (tested using [Color Oracle](https://colororacle.org)).

{% include links.md %}
