let feature = {
    "title": "string",
    "value": "integer",
}

let layer = {
    "features": "Array<Feature>",
    "bounds": "array"
}

let spatialUnit = {
    "title": "string",
}

let statistics = {
    "dataType": "string", // Data type enum
    "min": "integer",
    "max": "integer",
    "mean": "integer",
    "median": "integer",
    "stdDev": "integer"
}

var dataTypeEnum = [
    "QUAL",
    "QUANT"
]