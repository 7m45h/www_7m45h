+++
draft = false
outputs = ["headers"]
[build]
list = "never"
+++

{{< cache_ctrl.inline >}}
{{ range site.Pages }}
{{ $h := crypto.MD5 .Lastmod }}
{{ .RelPermalink }}
    ! ETag
    ETag: "{{ $h }}"
{{ with .OutputFormats.Get "rss" }}
{{ .RelPermalink }}
    ! ETag
    ETag: "{{ $h }}"
{{ end }}
{{ with .OutputFormats.Get "atom" }}
{{ .RelPermalink }}
    ! ETag
    ETag: "{{ $h }}"
{{ end }}
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
