<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
                <title>RSS feed | <xsl:value-of select="/atom:feed/atom:title"/></title>
                <meta name="color-scheme" content="light dark" />
                <link rel="stylesheet" href="/static/styles/global-20230303.css" />
                <link rel="icon" href="/static/favicon-20220314.png" />
            </head>
            <body>
                <main style="max-width: 768px; padding: var(--space-3xl) var(--space-2xl); margin: auto;">
                    <h1>RSS feed</h1>
                    <p style="margin-bottom: var(--space-l);">This is an RSS feed. Subscribe by copying the URL into your newsreader. Visit <a href="https://aboutfeeds.com">About Feeds</a> to learn more and get started.</p>
                    <h2 style="margin-bottom: var(--space-s);">Latest posts</h2>
                    <ul style="margin-bottom: var(--space-2xl);">
                        <xsl:for-each select="/atom:feed/atom:entry">
                            <li style="margin-bottom: var(--space-xs);">
                                <a>
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="atom:link/@href"/>
                                    </xsl:attribute>
                                    <xsl:value-of select="atom:title"/>
                                </a>
                                (<xsl:value-of select="substring(atom:published, 0, 11)" />)
                            </li>
                        </xsl:for-each>
                    </ul>
                    <a>
                        <xsl:attribute name="href">
                            <xsl:value-of select="/atom:feed/atom:link[1]/@href"/>
                        </xsl:attribute>
                        Back to homepage
                    </a>
                </main>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
