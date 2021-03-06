import { gql } from 'apollo-boost'
import { SEARCH_LIMIT } from './constants'

/*
    Graphql query to fetch all characters ordered by modified date in desc
    @params offset: number
    @params limit: number
*/
export const FETCH_CHARACTERS = gql`
    query fetchCharacters($offset: Int!, $limit: Int!, $filter: String) {
        container(offset: $offset, limit: $limit, orderBy: "-modified", nameStartsWith: $filter)
            @rest(type: "type_characters", path: "/characters?{args}") {
            total
            offset
            limit
            count
            results @type(name: "type_characters_result") {
                id
                title: name
                thumbnail @type(name: "type_characters_thumbnail") {
                    path
                    extension
                }
            }
        }
    }
`

/*
    Graphql query to fetch character by id
    @params characterId: ID (graphql type)
*/
export const FETCH_CHARACTER_BY_ID = gql`
    query fetchCharacterById($characterId: ID!) {
        container(characterId: $characterId)
            @rest(type: "type_characters_by_id", path: "/characters/{args.characterId}") {
            results @type(name: "type_characters_by_id_result") {
                name
                description
                thumbnail @type(name: "type_characters_by_id_thumbnail") {
                    path
                    extension
                }
            }
        }
    }
`

/*
    Graphql query to fetch all comics filtered by character id and ordered by modified date in desc
    @params filterId: ID (graphql type)
    @params offset: number
    @params limit: number
*/
export const FETCH_COMICS_BY_CHARACTER_ID = gql`
    query fetchComicsByCharacter($filter: ID!, $offset: Int!, $limit: Int!) {
        container(characterId: $filter, offset: $offset, limit: $limit, orderBy: "-modified")
            @rest(type: "type_comics_by_character_id", path: "/characters/{args.characterId}/comics?{args}") {
            total
            offset
            limit
            count
            results @type(name: "type_comics_by_character_id_results") {
                id
                title
                thumbnail @type(name: "type_comics_by_character_id_thumbnail") {
                    path
                    extension
                }
            }
        }
    }
`

/*
    Graphql query to fetch all series filtered by character id and ordered by modified date in desc
    @params filterId: ID (graphql type)
    @params offset: number
    @params limit: number
*/
export const FETCH_SERIES_BY_CHARACTER_ID = gql`
    query fetchSeriesByCharacterID($filter: ID!, $offset: Int!, $limit: Int!) {
        container(characterId: $filter, offset: $offset, limit: $limit, orderBy: "-modified")
            @rest(type: "type_series_by_character_id", path: "/characters/{args.characterId}/series?{args}") {
            total
            offset
            limit
            count
            results @type(name: "type_series_by_character_id_results") {
                id
                title
                thumbnail @type(name: "type_series_by_character_id_thumbnail") {
                    path
                    extension
                }
            }
        }
    }
`

/*
    Graphql query to fetch all comics ordered by modified date in desc
    @params offset: number
    @params limit: number
*/
export const FETCH_COMICS = gql`
    query fetchComics($offset: Int!, $limit: Int!, $filter: String) {
        container(offset: $offset, limit: $limit, orderBy: "-modified", titleStartsWith: $filter)
            @rest(type: "type_comics", path: "/comics?{args}") {
            total
            offset
            limit
            count
            results @type(name: "type_comics_results") {
                id
                title
                thumbnail @type(name: "type_comics_thumbnail") {
                    path
                    extension
                }
            }
        }
    }
`

/*
    Graphql query to fetch comic by id
    @params comicId: ID (graphql type)
*/
export const FETCH_COMIC_BY_ID = gql`
    query fetchComicById($comicId: ID!) {
        container(comicId: $comicId) @rest(type: "type_comics_by_id", path: "/comics/{args.comicId}") {
            results @type(name: "type_comics_by_id_results") {
                title
                description
                thumbnail @type(name: "type_comics_by_id_thumbnail") {
                    path
                    extension
                }
            }
        }
    }
`

/*
    Graphql query to fetch all characters filtered by comic id and ordered by modified date in desc
    @params filterId: ID (graphql type)
    @params offset: number
    @params limit: number
*/
export const FETCH_CHARACTERS_BY_COMIC_ID = gql`
    query fetchCharactersByComic($filter: ID!, $offset: Int!, $limit: Int!) {
        container(comicId: $filter, offset: $offset, limit: $limit, orderBy: "-modified")
            @rest(type: "type_characters_by_comics", path: "/comics/{args.comicId}/characters?{args}") {
            total
            offset
            limit
            count
            results @type(name: "type_characters_by_comics_results") {
                id
                title: name
                thumbnail @type(name: "type_characters_by_comics_thumbnail") {
                    path
                    extension
                }
            }
        }
    }
`

/*
    Graphql query to fetch all series ordered by modified date in desc
    @params offset: number
    @params limit: number
*/
export const FETCH_SERIES = gql`
    query fetchSeries($offset: Int!, $limit: Int!, $filter: String) {
        container(offset: $offset, limit: $limit, orderBy: "-modified", titleStartsWith: $filter)
            @rest(type: "type_series", path: "/series?{args}") {
            total
            offset
            limit
            count
            results @type(name: "type_series_results") {
                id
                title
                thumbnail @type(name: "type_series_thumbnail") {
                    path
                    extension
                }
            }
        }
    }
`

/*
    Graphql query to fetch series by id
    @params seriesId: ID (graphql type)
*/
export const FETCH_SERIES_BY_ID = gql`
    query fetchSeriesById($seriesId: ID!) {
        container(seriesId: $seriesId) @rest(type: "type_series_by_id", path: "/series/{args.seriesId}") {
            results @type(name: "type_series_by_id_results") {
                title
                description
                thumbnail @type(name: "type_series_by_id_thumbnail") {
                    path
                    extension
                }
            }
        }
    }
`

/*
    Graphql query to fetch all characters filtered by series id and ordered by modified date in desc
    @params filterId: ID (graphql type)
    @params offset: number
    @params limit: number
*/
export const FETCH_CHARACTERS_BY_SERIES_ID = gql`
    query fetchCharactersBySeries($filter: ID!, $offset: Int!, $limit: Int!) {
        container(seriesId: $filter, offset: $offset, limit: $limit, orderBy: "-modified")
            @rest(type: "type_characters_by_series", path: "/series/{args.seriesId}/characters?{args}") {
            total
            offset
            limit
            count
            results @type(name: "type_characters_by_series_results") {
                id
                title: name
                thumbnail @type(name: "type_characters_by_series_thumbnail") {
                    path
                    extension
                }
            }
        }
    }
`

/*
    Graphql query to fetch all comics filtered by series id and ordered by modified date in desc
    @params filterId: ID (graphql type)
    @params offset: number
    @params limit: number
*/
export const FETCH_COMICS_BY_SERIES_ID = gql`
    query fetchComicsBySeries($filter: ID!, $offset: Int!, $limit: Int!) {
        container(seriesId: $filter, offset: $offset, limit: $limit, orderBy: "-modified")
            @rest(type: "type_comics_by_series", path: "/series/{args.seriesId}/comics?{args}") {
            total
            offset
            limit
            count
            results @type(name: "type_comics_by_series_results") {
                id
                title: name
                thumbnail @type(name: "type_comics_by_series_thumbnail") {
                    path
                    extension
                }
            }
        }
    }
`

/*
    Graphql query to fetch content based on search
    @params search: string
*/
export const FETCH_SEARCH_RESULTS = gql`
    query fetchSearchResults($search: String!) {
        characters: container(offset: 0, limit: ${SEARCH_LIMIT}, nameStartsWith: $search, orderBy: "-modified")
            @rest(type: "type_characters", path: "/characters?{args}") {
            total
            offset
            limit
            count
            results @type(name: "type_characters_result") {
                id
                title: name
                thumbnail @type(name: "type_characters_thumbnail") {
                    path
                    extension
                }
            }
        }

        comics: container(offset: 0, limit: 6, titleStartsWith: $search, orderBy: "-modified")
            @rest(type: "type_comics", path: "/comics?{args}") {
            total
            offset
            limit
            count
            results @type(name: "type_comics_results") {
                id
                title
                thumbnail @type(name: "type_comics_thumbnail") {
                    path
                    extension
                }
            }
        }

        series: container(offset: 0, limit: 6, titleStartsWith: $search, orderBy: "-modified")
            @rest(type: "type_series", path: "/series?{args}") {
            total
            offset
            limit
            count
            results @type(name: "type_series_results") {
                id
                title
                thumbnail @type(name: "type_series_thumbnail") {
                    path
                    extension
                }
            }
        }
    }
`
