+++
draft = false
outputs = ["headers"]
[build]
list = "never"
+++

{{< cache_ctrl.inline >}}
{{ range site.Pages }}
{{ $url := .RelPermalink }}
{{ with .GitInfo.AbbreviatedHash  }}
{{ $url }}
    ETag: "{{ . }}"
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
