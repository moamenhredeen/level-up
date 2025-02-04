import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import webc from "@11ty/eleventy-plugin-webc";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import { EleventyHtmlBasePlugin } from '@11ty/eleventy';
import { readFile } from 'node:fs/promises';

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function(eleventyConfig) {
    // template
    eleventyConfig.setLayoutResolution(false);

    // layout
    eleventyConfig.setLayoutsDirectory("layouts")

    // alises
    eleventyConfig.addLayoutAlias("default", "default.html")
    eleventyConfig.addLayoutAlias("sidebar", "sidebar-layout.liquid")


    // copy resouces
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/**/*.css");


    // ignores
    eleventyConfig.ignores.add("README.md")
    eleventyConfig.ignores.add("_drafts/**")

    // bundles
    eleventyConfig.addBundle("css", {
        "toFileDirectory": "dist"
    })

    // plugins
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
			baseHref: "https://moamenhredeen.github.io/level-up/"
		});
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(webc);
    eleventyConfig.addPlugin(feedPlugin, {
        type: "atom", // or "rss", "json"
        outputPath: "/feed.xml",
        collection: {
            name: "Post",
            limit: 0,
        },
        metadata: {
            language: "en",
            title: "LevelUp",
            subtitle: "Technical Blog",
            base: "https://moamenhredeen.github.io/level-up/",
            author: {
                name: "Moamen Hredeen",
                email: "moamen@hredeen.com",
            }
        }
    });

    // collections
    eleventyConfig.addCollection("tags", async (collectionApi) => {
        return new Set(collectionApi.getAll()
            .flatMap(e => e.data.tags)
            .filter(e => e !== undefined && e.trim() !== ''));
    });

    eleventyConfig.addCollection("postsByYear", collectionApi => {
        const posts = collectionApi.getFilteredByTag("Post").reverse();
        const years = posts.map(post => post.date.getFullYear());
        const uniqueYears = [...new Set(years)]
        const postsByYear = new Map();
        for (const year of uniqueYears) {
            postsByYear.set(year, posts.filter(post => post.date.getFullYear() === year));
        }
        return postsByYear
    });

    // shortcodes
    eleventyConfig.addShortcode("svg", async (name) => {
        return  await readFile(`./src/assets/icons/${name}.svg`, { encoding: "utf8" });
    })
}

export const config = {
    dir: {
        input: "src",
        output: "build",
    }
}
