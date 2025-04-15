+++
draft = false
outputs = ["headers"]
[build]
list = "never"
+++

{{< cache_ctrl.inline >}}
{{ range site.Pages }}
{{ .RelPermalink }}
    Last-Modified: {{ .Lastmod.UTC.Format "Mon, 02 Jan 2006 15:04:05 GMT" }}
{{ end }}
{{</ cache_ctrl.inline >}}

/*
    ! Cache-Control
    Cache-Control: max-age=3600, must-revalidate, public, stale-if-error=3600, stale-while-revalidate=3600

/*.avif
    ! Cache-Control
    Cache-Control: immutable, max-age=2628000, public

/*.ico
    ! Cache-Control
    Cache-Control: immutable, max-age=2628000, public

/*.svg
    ! Cache-Control
    Cache-Control: immutable, max-age=2628000, public
