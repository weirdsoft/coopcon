#!/bin/sh
SCRIPT_DIR=`dirname $0`

echo 'Updating...'

curl -s -N -XPOST -H "Content-Type:application/json" -d '{"query": "{ __schema { queryType { name } mutationType { name } subscriptionType { name } types { ...FullType } directives { name description args { ...InputValue } onOperation onFragment onField } } } fragment FullType on __Type { kind name description fields(includeDeprecated: true) { name description args { ...InputValue } type { ...TypeRef } isDeprecated deprecationReason } inputFields { ...InputValue } interfaces { ...TypeRef } enumValues(includeDeprecated: true) { name description isDeprecated deprecationReason } possibleTypes { ...TypeRef } } fragment InputValue on __InputValue { name description type { ...TypeRef } defaultValue } fragment TypeRef on __Type { kind name ofType { kind name ofType { kind name ofType { kind name } } } }"} ' http://localhost/api | python -m json.tool > $SCRIPT_DIR/gql_schema.json

echo 'Done!'
